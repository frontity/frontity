import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { Response, Headers } from "cross-fetch";
import { state, actions, effects } from "..";

import patterns from "./mocks/patterns";
import postArchiveJson from "./mocks/postArchive.json";
import postArchiveP2Json from "./mocks/postArchiveP2.json";

const mockResponse = (body, headers) =>
  new Response(
    JSON.stringify(body),
    headers && {
      headers: new Headers(headers)
    }
  );

describe("fetch", () => {
  test("get post archive", async () => {
    const { resolver, populate } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    const api = {
      get: jest.fn().mockResolvedValueOnce(
        mockResponse(postArchiveJson, {
          "X-WP-Total": "64",
          "X-WP-TotalPages": "7"
        })
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api, populate }
    });
    await store.actions.source.fetch("/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source.dataMap).toMatchSnapshot();
    
    ["post", "category", "tag", "author", "attachment"].forEach(name => {
      const state = store.state.source;
      expect(
        Object.values(state[name]).map(({ id, slug, link }) => ({
          id,
          slug,
          link
        }))
      ).toMatchSnapshot();
    });
  });

  test("post archive twice gets data once", async () => {
    const { resolver, populate } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    const api = {
      get: jest.fn().mockResolvedValueOnce(
        mockResponse(postArchiveJson, {
          "X-WP-Total": "64",
          "X-WP-TotalPages": "7"
        })
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api, populate }
    });
    await store.actions.source.fetch("/");
    await store.actions.source.fetch("/");
    expect(api.get).toBeCalledTimes(1);
  });

  test("get two pages of post archive", async () => {
    const { resolver, populate } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    const api = {
      get: jest
        .fn()
        .mockResolvedValueOnce(
          mockResponse(postArchiveJson, {
            "X-WP-Total": "64",
            "X-WP-TotalPages": "7"
          })
        )
        .mockResolvedValueOnce(
          mockResponse(postArchiveP2Json, {
            "X-WP-Total": "64",
            "X-WP-TotalPages": "7"
          })
        )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api, populate }
    });
    await store.actions.source.fetch("/");
    await store.actions.source.fetch({ path: "/", page: 2 });
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(api.get).toBeCalledTimes(2);
    expect(store.state.source.dataMap).toMatchSnapshot();
  });
});
