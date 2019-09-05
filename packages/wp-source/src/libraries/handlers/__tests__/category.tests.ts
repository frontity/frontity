import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../category";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/posts-cat-7.json";

import wpSource from "../../../";
jest.mock("../../../");

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // First, get a mocked instance of wpSource
  const config = wpSource();

  // Then, replaces the mocked implementation of Api
  const { api } = config.libraries.source;
  api.getIdBySlug = jest.fn().mockResolvedValue(7);
  api.get = jest.fn().mockResolvedValue(
    mockResponse(posts, {
      "X-WP-Total": 10,
      "X-WP-TotalPages": 5
    })
  );

  // And add the original implementation of populate
  config.libraries.source.populate = jest.fn().mockImplementation(populate);

  // Instantiate the store
  store = createStore(config);
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    // source.fetch("/category/nature/")
    store.state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/",
      params: { slug: "nature" },
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("exists in source.category but not in source.data", async () => {
    store.state.source.category[7] = {
      id: 7,
      count: 10,
      description: "",
      link: "https://test.frontity.io/category/nature/",
      name: "Nature",
      slug: "nature",
      taxonomy: "category",
      parent: 0,
      meta: []
    };

    // source.fetch("/category/nature/")
    store.state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/",
      params: { slug: "nature" },
      ...store
    });

    expect(store.libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("works with pagination", async () => {
    // source.fetch("/category/nature/")
    store.state.source.data["/category/nature/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/page/2/",
      params: { slug: "nature" },
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };
    // source.fetch("/category/nature/")
    store.state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/",
      params: { slug: "nature" },
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });

  test("throws an error if author doesn't exist in WP", async () => {
    const notFoundError = new Error("Not found");
    store.libraries.source.api.getIdBySlug = jest
      .fn()
      .mockRejectedValueOnce(notFoundError);

    // source.fetch("/category/nature")
    store.state.source.data["/category/nature"] = {
      isFetching: true,
      isReady: false
    };

    await expect(
      handler({
        route: "/category/nature",
        params: { slug: "nature" },
        ...store
      })
    ).rejects.toThrow(notFoundError);
  });

  test("throws an error if the page fetched is out of range", async () => {
    store.libraries.source.api.get = jest.fn().mockResolvedValue(
      mockResponse([], {
        "X-WP-Total": 5,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/category/nature/page/2/")
    store.state.source.data["/category/nature/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    await expect(
      handler({
        route: "/category/nature/page/2/",
        params: { slug: "nature" },
        ...store
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("doesn't throw an error if the first page is empty", async () => {
    store.libraries.source.api.get = jest.fn().mockResolvedValue(
      mockResponse([], {
        "X-WP-Total": 5,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/category/nature/")
    store.state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await expect(
      handler({
        route: "/category/nature/",
        params: { slug: "nature" },
        ...store
      })
    ).resolves.toBe(undefined);
  });
});
