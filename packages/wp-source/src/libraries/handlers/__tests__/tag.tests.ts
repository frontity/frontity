import { createStore, InitializedStore, observe } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import tag1 from "./mocks/tag/tag-1.json";
import tag1Posts from "./mocks/tag/tag-1-posts.json";
import tag1PostsPage2 from "./mocks/tag/tag-1-posts-page-2.json";
import tag1PostsCpt from "./mocks/tag/tag-1-posts-cpt.json";
import { Package } from "frontity/types";

let store: InitializedStore<WpSource & Package>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSource>(clone(wpSource()));

  // We need to set it because state.source.url derives state from state.frontity.url
  store.state.frontity = { url: "http://frontity.local" };

  store.state.source.api = "https://test.frontity.org/wp-json";
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
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("was populated but not accessed", async () => {
    // Add tag to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse([tag1]),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(tag1PostsPage2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Observe changes in isFetching and isReady properties
    const dataState = [];
    observe(() => {
      const { isFetching, isReady } = store.state.source.get(
        "/tag/tag-1/page/2/"
      );
      dataState.push({ isFetching, isReady });
    });
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/page/2/");
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
    // Values history of isFetching and isReady
    expect(dataState).toEqual([
      { isFetching: false, isReady: false }, // first values are from a different object
      { isFetching: true, isReady: false }, // fetch starts
      { isFetching: false, isReady: true }, // fetch ends
    ]);
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
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if tag doesn't exist in WP", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValue(mockResponse([], {}, { status: 404 }));

    // Fetch entities
    await store.actions.source.fetch("/tag/non-existent/");
    expect(api.get).toHaveBeenCalledTimes(1);
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
          "X-WP-TotalPages": "0",
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

  test("is requested with any query param", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse(tag1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("with a search", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse(tag1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });

  test("with a search with pagination", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([tag1]))
      .mockResolvedValueOnce(
        mockResponse(tag1PostsPage2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/tag/tag-1/page/2?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });
});
