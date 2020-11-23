import { createStore, InitializedStore, observe } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import cat1 from "./mocks/category/cat-1.json";
import cat1Posts from "./mocks/category/cat-1-posts.json";
import cat1PostsPage2 from "./mocks/category/cat-1-posts-page-2.json";
import cat1PostsCpt from "./mocks/category/cat-1-posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSource>(clone(wpSource()));
  store.state.source.url = "https://test.frontity.org";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse(cat1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("was populated but not accessed", async () => {
    // Add category to the store
    await store.libraries.source.populate({
      state: store.state,
      response: mockResponse([cat1]),
    });
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(cat1PostsPage2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Observe changes in isFetching and isReady properties
    const dataState = [];
    observe(() => {
      const { isFetching, isReady } = store.state.source.get(
        "/category/cat-1/page/2/"
      );
      dataState.push({ isFetching, isReady });
    });
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/page/2/");
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
    // Values history of isFetching and isReady
    expect(dataState).toEqual([
      // First values are from a different object.
      { isFetching: false, isReady: false },
      // Fetch starts.
      { isFetching: true, isReady: false },
      // Fetch ends.
      { isFetching: false, isReady: true },
    ]);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // Add custom post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse(cat1PostsCpt, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if category doesn't exist in WP", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/category/non-existent/");
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if the page fetched is out of range", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/page/3");
    expect(store.state.source).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse([], {
          "X-WP-Total": "0",
          "X-WP-TotalPages": "0",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty (no headers)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(mockResponse([], {}));
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("is requested with any query param", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse(cat1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("with a search", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse(cat1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });

  test("with a search with pagination", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([cat1]))
      .mockResolvedValueOnce(
        mockResponse(cat1PostsPage2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/category/cat-1/page/2?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });

  test("Unknown URL should return a 404 even if it's substring matches a path", async () => {
    api.get = jest.fn((_) =>
      Promise.resolve(
        mockResponse(cat1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      )
    );

    await store.actions.source.fetch("/category/undefined/cat-1/");

    expect(
      (store.state.source.data as any)["/category/undefined/cat-1/"]
        .errorStatusText
    ).toBe(
      "You have tried to access content at route: /category/undefined/cat-1/ but it does not exist"
    );

    expect(store.state.source).toMatchSnapshot();
  });
});
