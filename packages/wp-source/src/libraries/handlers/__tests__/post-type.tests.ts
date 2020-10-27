import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import attachment1 from "./mocks/post-type/attachment-1.json";
import page1 from "./mocks/post-type/page-1.json";
import post1 from "./mocks/post-type/post-1.json";
import post1withType from "./mocks/post-type/post-1-with-type.json";
import cpt11 from "./mocks/post-type/cpt-11.json";
import { ServerError, isError, isPostType } from "@frontity/source";
import { PostEntity } from "@frontity/source/types";

interface WpSourceAndCpt extends WpSource {
  state: {
    source: WpSource["state"]["source"] & {
      cpt: Record<string, PostEntity>;
    };
  };
}

let store: InitializedStore<WpSourceAndCpt>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSourceAndCpt>(clone(wpSource()));
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
    api.get = jest.fn((_) => Promise.resolve(mockResponse([])));

    // Fetch entities
    await store.actions.source.fetch("/non-existent/");
    expect(api.get).toHaveBeenCalledTimes(3);
    expect(store.state.source).toMatchSnapshot();
  });

  test("should contain the correct error code on error", async () => {
    // Mock Api responses
    api.get = jest.fn(async (_) => {
      throw new ServerError("statusText", 400, "statusText");
    });

    // Fetch entities
    await store.actions.source.fetch("/post-1/");

    const data = store.state.source.data["/post-1/"];
    expect(isError(data)).toBe(true);
    expect(isError(data) && data.is400).toBe(true);
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([post1]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.post", async () => {
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(post1),
    });
    // Mock Api responses
    api.get = jest.fn();
    // Fetch entities
    await store.actions.source.fetch("/post-1/");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // Add custom post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([cpt11]));
    // Fetch entities
    await store.actions.source.fetch("/cpt/cpt-11");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (doesn't exist in source.post)", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([post1]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (exists in source.post)", async () => {
    // Add post to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(post1),
    });
    // Mock Api responses
    api.get = jest.fn();
    // Fetch entities
    await store.actions.source.fetch("/post-1/?some=param");
    expect(api.get).not.toHaveBeenCalled();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with types embedded", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([post1withType]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/");
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("page", () => {
  test("doesn't exist in source.page", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]))
      .mockResolvedValueOnce(mockResponse([page1]));
    // Fetch entities
    await store.actions.source.fetch("/page-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.page", async () => {
    // Add page to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(page1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/page-1/");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (doesn't exist in source.page)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]))
      .mockResolvedValueOnce(mockResponse([page1]));
    // Fetch entities
    await store.actions.source.fetch("/page-1/?some=param");
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
    await store.actions.source.fetch("/page-1/?some=param");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });
});

describe("attachment", () => {
  test("doesn't exist in source.attachment", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]))
      .mockResolvedValueOnce(mockResponse([attachment1]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/attachment-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.attachment", async () => {
    // Add attachment to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(attachment1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/attachment-1/");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (doesn't exist in source.attachment)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]))
      .mockResolvedValueOnce(mockResponse([attachment1]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/attachment-1/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params (exists in source.attachment)", async () => {
    // Add attachment to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse(attachment1),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/attachment-1/?some=param");
    expect(api.get).toHaveBeenCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });

  test("overwrites the data when fetched with { force: true }", async () => {
    api.get = jest.fn((_) => Promise.resolve(mockResponse([post1])));

    // Fetch entities
    await store.actions.source.fetch("/post-1");

    // Restore the mock (just change the ID)
    api.get = jest.fn((_) =>
      Promise.resolve(mockResponse([{ ...post1, id: 2 }]))
    );

    // Fetch again
    await store.actions.source.fetch("/post-1", { force: true });

    expect(store.state.source).toMatchSnapshot();

    // Should have the new ID now
    const data = store.state.source.get("/post-1");
    expect(isPostType(data) && data.id).toEqual(2);

    // Delete the IDs because there are different
    const firstPost = store.state.source.post[1];
    const secondPost = store.state.source.post[2];
    delete firstPost.id;
    delete secondPost.id;

    expect(firstPost).toMatchObject(secondPost);
  });

  test("Every unknown URL should return a 404 even if it's substring matches a path", async () => {
    api.get = jest.fn((_) =>
      Promise.resolve(
        mockResponse([
          {
            id: 1,
            slug: "post-1",
            type: "post",
            link: "https://test.frontity.org/post-1/",
          },
        ])
      )
    );

    await store.actions.source.fetch("/undefined/post-1/");

    expect(store.state.source).toMatchSnapshot();
  });

  test("Every unknown URL should return a 404 even if it's substring matches a path 2", async () => {
    api.get = jest.fn((_) =>
      Promise.resolve(
        mockResponse([
          {
            id: 1,
            slug: "post-1",
            type: "post",
            link: "https://test.frontity.org/post-1/",
          },
        ])
      )
    );

    await store.actions.source.fetch("/does/not/exist/");

    expect(store.state.source).toMatchSnapshot();
  });
});
