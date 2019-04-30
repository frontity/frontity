import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { Response, Headers } from "cross-fetch";
import { state, actions, effects } from "..";
import { OnInitialize } from "../../types";

import patterns from "./mocks/patterns";
import categoryJson from "./mocks/category.json";
import postsFromCategoryJson from "./mocks/postsFromCategory.json";

const mockResponse = (body, headers) =>
  new Response(
    JSON.stringify(body),
    headers && {
      headers: new Headers(headers)
    }
  );

describe("fetch", () => {
  test("category for the first time", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    // Mock get responses
    const api = {
      get: jest
        .fn()
        .mockResolvedValueOnce(
          mockResponse(categoryJson, {
            "X-WP-Total": 1,
            "X-WP-TotalPages": 1
          })
        )
        .mockResolvedValueOnce(
          mockResponse(postsFromCategoryJson, {
            "X-WP-Total": 10,
            "X-WP-TotalPages": 1
          })
        )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ path: "/category/nature/" });
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
  });

  test("category that exists in state", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    // Mock get responses
    const api = {
      get: jest.fn().mockResolvedValueOnce(
        mockResponse(postsFromCategoryJson, {
          "X-WP-Total": 10,
          "X-WP-TotalPages": 1
        })
      )
    };
    const dataMap = {
      ["/category/nature/"]: {
        id: 7,
        isArchive: true,
        isCategory: true,
        isFetching: false,
        isReady: true,
        isTaxonomy: true,
        pages: [],
        taxonomy: "category",
        total: 10,
        totalPages: 1
      }
    };

    const categories = {
      [7]: {
        taxonomy: "category",
        id: 7,
        slug: "nature",
        link: "https://test.frontity.io/category/nature/"
      }
    };

    const config = namespaced({
      source: { actions, state: { ...state, dataMap, categories }, effects }
    });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ path: "/category/nature/", page: 1 });
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(store.state.source.dataMap).toMatchSnapshot();
  });

  test("try to get a category that doesn't exist", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    // Mock get responses
    const api = {
      get: jest.fn().mockResolvedValueOnce(
        mockResponse([], {
          "X-WP-Total": 0,
          "X-WP-TotalPages": 0
        })
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ path: "/category/not-a-category/" });
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
  });

  test("the same category twice gets the data once", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    // Mock get responses
    const api = {
      get: jest
        .fn()
        .mockResolvedValueOnce(
          mockResponse(categoryJson, {
            "X-WP-Total": 1,
            "X-WP-TotalPages": 1
          })
        )
        .mockResolvedValueOnce(
          mockResponse(postsFromCategoryJson, {
            "X-WP-Total": 10,
            "X-WP-TotalPages": 1
          })
        )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ path: "/category/nature/" });
    await store.actions.source.fetch({ path: "/category/nature/" });
    expect(api.get).toBeCalledTimes(2);
  });
});
