import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import tag1 from "./mocks/tag/tag-1.json";
import tag1Posts from "./mocks/tag/tag-1-posts.json";
import tag1PostsPage2 from "./mocks/tag/tag-1-posts-page-2.json";
import tag1PostsCpt from "./mocks/tag/tag-1-posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(wpSource());
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("tag", () => {
  test("doesn't exist in source.tag", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse(tag1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("exists in source.tag but not in source.data", async () => {
    // Add author to the store
    store.state.source.tag[1] = tag1;
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(tag1PostsPage2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2"
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/page/2/");
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // Add custom post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse(tag1PostsCpt, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if tag doesn't exist in WP", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/tag/non-existent/");
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if the page fetched is out of range", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/page/3");
    expect(store.state.source).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse([], {
          "X-WP-Total": "0",
          "X-WP-TotalPages": "0"
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty (no headers)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(mockResponse([], {}));
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(store.state.source).toMatchSnapshot();
  });
});
