import * as frontity from "frontity";
import Router from "@frontity/router/types";

import merge from "deepmerge";
import clone from "clone-deep";
import { InitializedStore, createStore } from "@frontity/connect";
import WpSource, { Pattern, Handler } from "../../types";
import wpSource from "..";
import { ServerError } from "@frontity/source";

let handler: jest.Mocked<Pattern<Handler>>;
let store: InitializedStore<WpSource & Router>;
let mockedFetch: jest.MockedFunction<typeof fetch>;

beforeEach(() => {
  mockedFetch = jest.fn((_) =>
    Promise.resolve({
      url: "https://localhost:8080/redirected-url",
      redirected: true,
    } as Response)
  );
  (frontity.fetch as typeof fetch) = mockedFetch;

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
    priority: 10,
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

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(handler.func).toHaveBeenCalledTimes(1);

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://localhost:8080/some-post/",
      {
        method: "HEAD",
      }
    );

    // Check that we have called the `fetch()` before calling the handler
    expect(mockedFetch.mock.invocationCallOrder[0]).toBeLessThan(
      handler.func.mock.invocationCallOrder[0]
    );

    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "/some-post/": Object {
          "id": 1,
          "isFetching": false,
          "isPostType": true,
          "isReady": true,
          "link": "/some-post/",
          "page": 1,
          "query": Object {},
          "route": "/some-post/",
          "type": "example",
        },
      }
    `);
  });
});

describe("redirections: 404", () => {
  test("Should ignore the redirection if there is no error", async () => {
    store.state.router.redirections = "404";

    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).not.toHaveBeenCalled();
    expect(handler.func).toHaveBeenCalledTimes(1);
  });

  test("Should NOT redirect on an error that is not a 404", async () => {
    store.state.router.redirections = "404";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler.func = jest.fn(async ({ route, state }) => {
      throw new ServerError("There was an error", 500);
    });
    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).not.toHaveBeenCalled();
    expect(handler.func).toHaveBeenCalledTimes(1);
  });

  test("Should redirect on 404", async () => {
    store.state.router.redirections = "404";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler.func = jest.fn(async ({ route, state }) => {
      throw new ServerError("There was an error", 404);
    });
    await store.actions.source.fetch("/some-post/");

    // the `fetch()` was called
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(handler.func).toHaveBeenCalledTimes(1);

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://localhost:8080/some-post/",
      {
        method: "HEAD",
      }
    );

    // The handler should have been called before we called the fetch()
    expect(handler.func.mock.invocationCallOrder[0]).toBeLessThan(
      mockedFetch.mock.invocationCallOrder[0]
    );

    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "/some-post/": Object {
          "is301": true,
          "isFetching": false,
          "isReady": true,
          "isRedirection": true,
          "link": "/some-post/",
          "location": "/redirected-url",
          "page": 1,
          "query": Object {},
          "route": "/some-post/",
        },
      }
    `);
  });

  test("Handle if fetching the redirection fails", async () => {
    store.state.router.redirections = "404";

    mockedFetch = jest.fn().mockRejectedValueOnce("Fetch Error");
    (frontity.fetch as typeof fetch) = mockedFetch;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler.func = jest.fn(async ({ route, state }) => {
      throw new ServerError("There was an error", 404);
    });
    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).toHaveBeenCalledWith(
      "http://localhost:8080/some-post/",
      {
        method: "HEAD",
      }
    );
    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "/some-post/": Object {
          "errorStatus": 404,
          "errorStatusText": "There was an error",
          "is404": true,
          "isError": true,
          "isFetching": false,
          "isReady": true,
        },
      }
    `);
  });
});
