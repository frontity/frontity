import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { Response, Headers } from "cross-fetch";
import { state, actions, effects } from "..";

import patterns from "./mocks/patterns";
import postArchiveJson from "./mocks/postArchive.json";

describe("fetch", () => {
  test("get post archive", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    const api = {
      get: jest.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(postArchiveJson), {
            headers: new Headers({
              "X-WP-Total": "47",
              "X-WP-TotalPages": "5"
            })
          })
        )
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ name: "/" });
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source.dataMap).toMatchSnapshot();
  });

  test("post archive twice gets data once", async () => {
    const { resolver } = effects;
    patterns.forEach(({ pattern, handler }) => {
      resolver.add(pattern, handler);
    });
    const api = {
      get: jest.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify(postArchiveJson), {
            headers: new Headers({
              "X-WP-Total": "47",
              "X-WP-TotalPages": "5"
            })
          })
        )
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api }
    });
    await store.actions.source.fetch({ name: "/" });
    await store.actions.source.fetch({ name: "/" });
    expect(api.get).toBeCalledTimes(1);
  });
});