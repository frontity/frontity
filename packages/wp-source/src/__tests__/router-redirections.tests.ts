import * as frontity from "frontity";
import Router from "@frontity/router/types";

import merge from "deepmerge";
import clone from "clone-deep";
import { InitializedStore, createStore } from "@frontity/connect";
import WpSource, { Pattern, Handler } from "../../types";
import wpSource from "..";

let handler: jest.Mocked<Pattern<Handler>>;
let store: InitializedStore<WpSource & Router>;
const fetch = jest.spyOn(frontity, "fetch").mockResolvedValue(undefined);

beforeEach(() => {
  fetch.mockClear();

  // Initialize the store
  store = createStore<WpSource & Router>(
    clone(
      merge(
        wpSource(),
        {
          state: {
            router: {},
          },
        },
        { clone: false }
      )
    )
  );

  handler = {
    name: "always",
    priority: 0,
    pattern: "/(.*)",
    func: jest.fn(async ({ route, state }) => {
      await Promise.resolve();
      Object.assign(state.source.data[route], {
        type: "example",
        id: 1,
        isPostType: true,
        isFetching: true,
        isReady: false,
      });
    }),
  };

  store.state.source.api = "https://test.frontity.org/wp-json";

  store.libraries.source.handlers.push(handler);
});

describe("redirections: all", () => {
  test("Redirect with all", async () => {
    store.state.router.redirections = "all";

    await store.actions.source.fetch("/some-post/");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(handler.func).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/some-post/", {
      method: "HEAD",
    });

    // Check that we have called the `fetch()` before calling the handler
    expect(fetch.mock.invocationCallOrder[0]).toBeLessThan(
      handler.func.mock.invocationCallOrder[0]
    );
  });
});

describe("redirections: 404", () => {
  test("Should ignore the redirection if there is no error", async () => {
    store.state.router.redirections = "404";

    await store.actions.source.fetch("/some-post/");

    // the `fetch()` was not called
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(handler.func).toHaveBeenCalledTimes(1);
  });

  test("Should redirect on 404", async () => {
    // TODO: Finish this test

    store.state.router.redirections = "404";

    await store.actions.source.fetch("/some-post/");

    // the `fetch()` was not called
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(handler.func).toHaveBeenCalledTimes(1);
  });
});
