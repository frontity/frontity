import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { Response, Headers } from "cross-fetch";
import { state, actions, effects } from "..";

import patterns from "./mocks/patterns";
import categoryJson from "./mocks/category.json";
import postsFromCategoryJson from "./mocks/postsFromCategory.json";

const mockResponse = (body, headers?) =>
  new Response(
    JSON.stringify(body),
    headers && {
      headers: new Headers(headers)
    }
  );

describe("fetch", () => {
  test("get category", async () => {
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
    await store.actions.source.fetch({ name: "/category/nature/" });
    expect(api.get.mock.calls).toMatchSnapshot();
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
    await store.actions.source.fetch({ name: "/category/not-a-category/" });
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
    await store.actions.source.fetch({ name: "/category/nature/" });
    await store.actions.source.fetch({ name: "/category/nature/" });
    expect(api.get).toBeCalledTimes(2);
  });
});
