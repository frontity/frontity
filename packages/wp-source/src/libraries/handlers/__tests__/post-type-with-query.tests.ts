import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../..";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import page1 from "./mocks/post-type/page-1.json";
import post1 from "./mocks/post-type/post-1.json";
import post1withType from "./mocks/post-type/post-1-with-type.json";
import cpt11 from "./mocks/post-type/cpt-11.json";
import { ServerError } from "@frontity/source";
import { PostEntity } from "@frontity/source/types";
import { Package } from "frontity/types";

interface WpSourceAndCpt extends WpSource {
  state: {
    source: WpSource["state"]["source"] & {
      cpt: Record<string, PostEntity>;
    };
    wpSource: {
      prefix: string;
    };
  };
}

let store: InitializedStore<WpSourceAndCpt & Package>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSourceAndCpt & Package>(clone(wpSource()));

  // We need to set it because state.source.url derives state from state.frontity.url
  store.state.frontity = { url: "http://frontity.local" };

  store.state.source.api = "https://test.frontity.org/wp-json";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("postType", () => {
  test("returns 404 if not found", async () => {
    // Mock Api responses
    // We have to use this form instead of:
    // .mockResolvedValueOnce(mockResponse([]))
    // because the latter always returns the same instance of Response.
    // which results in error because response.json() can only be run once
    api.get = jest.fn((_) =>
      Promise.reject(new ServerError("Not Found", 404, "Not Found"))
    );
    // Fetch entities
    await store.actions.source.fetch("/?p=1");
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
  });

  test("should contain the correct error code on error", async () => {
    // Mock Api responses
    api.get = jest.fn(async (_) => {
      throw new ServerError("Bad Request", 400, "Bad Request");
    });
    // Fetch entities
    await store.actions.source.fetch("/?p=1");
    expect(store.state.source.data["/?p=1"].isError).toBe(true);
    expect(store.state.source.data["/?p=1"]["is400"]).toBe(true);
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(post1));
    // Fetch entities
    await store.actions.source.fetch("/?p=1");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.post", async () => {
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(post1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/?p=1");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (doesn't exist in source.post)", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(post1));
    // Fetch entities
    await store.actions.source.fetch("/?p=1&some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (exists in source.post)", async () => {
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(post1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/?p=1&some=param");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with unordered query params (doesn't exist in source.post)", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(post1));
    // Fetch entities
    await store.actions.source.fetch("/?z=v1&p=1&a=v2");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with unordered query params (exists in source.post)", async () => {
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(post1),
    });
    // Mock Api responses
    api.get = jest.fn();
    // Fetch entities
    await store.actions.source.fetch("/?z=v1&p=1&a=v2");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with types embedded", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(post1withType));
    // Fetch entities
    await store.actions.source.fetch("/?p=1");
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("page", () => {
  test("doesn't exist in source.page", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(page1));
    // Fetch entities
    await store.actions.source.fetch("/?page_id=1");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.page", async () => {
    // Add page to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(page1),
    });
    // Mock Api responses
    api.get = jest.fn();
    // Fetch entities
    await store.actions.source.fetch("/?page_id=1");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (doesn't exist in source.page)", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(page1));
    // Fetch entities
    await store.actions.source.fetch("/?page_id=1&some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (exists in source.page)", async () => {
    // Add page to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(page1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/?page_id=1&some=param");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("custom post type", () => {
  test("works with custom post types (doesn't exist in source.post)", async () => {
    store.state.source.postTypes = [
      {
        endpoint: "cpts",
        type: "cpt",
      },
    ];
    // Execute init and create handlers for CPT.
    store.actions.source.init();
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse(cpt11));
    // Fetch entities
    await store.actions.source.fetch("/?p=11&post_type=cpt");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with custom post types (exists in source.post)", async () => {
    store.state.source.postTypes = [
      {
        endpoint: "cpts",
        type: "cpt",
      },
    ];
    // Execute init and create handlers for CPT.
    store.actions.source.init();
    const response = mockResponse(cpt11);
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response,
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/?post_type=cpt&p=11");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });
});
