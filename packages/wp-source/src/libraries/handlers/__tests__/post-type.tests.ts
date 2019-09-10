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
import cpt11 from "./mocks/post-type/cpt-11.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(clone(wpSource()));
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("postType", () => {
  test("returns 404 if not found", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/non-existent/");
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
      response: mockResponse(post1)
    });
    // Mock Api responses
    api.get = jest.fn();
    // Fetch entities
    await store.actions.source.fetch("/post-1/");
    expect(api.get).not.toBeCalled();
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
      response: mockResponse(page1)
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/page-1/");
    expect(api.get).toBeCalledTimes(0);
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
      response: mockResponse(attachment1)
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/attachment-1/");
    expect(api.get).toBeCalledTimes(0);
    expect(store.state.source).toMatchSnapshot();
  });
});
