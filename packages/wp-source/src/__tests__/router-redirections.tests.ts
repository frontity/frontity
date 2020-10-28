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

const fetchRedirectionParams = [
  "http://localhost:8080/some-post/",
  {
    method: "HEAD",
  },
];

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
  it("Should handle a redirect with 'all'", async () => {
    store.state.router.redirections = "all";

    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

    expect(handler.func).toHaveBeenCalledTimes(1);
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
  beforeEach(() => {
    // The handler throws a ServerError to imitate getting a 404 from the WP
    // REST API.
    handler.func = jest.fn(() => {
      throw new ServerError("There was an error", 404);
    }) as any;
  });

  it("Should ignore the redirection if there is no error", async () => {
    store.state.router.redirections = "404";

    // Restore the handler to the original implementation
    handler.func.mockRestore();

    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).not.toHaveBeenCalled();
    expect(handler.func).toHaveBeenCalledTimes(1);
  });

  it("Should NOT redirect on an error that is not a 404", async () => {
    store.state.router.redirections = "404";

    // Throw a 500 inside of the handler
    handler.func = jest.fn(() => {
      throw new ServerError("There was an error", 500);
    }) as any;

    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).not.toHaveBeenCalled();
    expect(handler.func).toHaveBeenCalledTimes(1);
  });

  it("Should redirect on 404", async () => {
    store.state.router.redirections = "404";

    await store.actions.source.fetch("/some-post/");

    // the `fetch()` was called
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

    expect(handler.func).toHaveBeenCalledTimes(1);
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
          "location": "/redirected-url/",
          "page": 1,
          "query": Object {},
          "route": "/some-post/",
        },
      }
    `);
  });

  it("Should return a normal 404 error if fetching the redirection fails", async () => {
    store.state.router.redirections = "404";

    // Fetching the redirection fails
    mockedFetch = jest.fn().mockRejectedValueOnce("Fetch Error");
    (frontity.fetch as typeof fetch) = mockedFetch;

    await store.actions.source.fetch("/some-post/");

    expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);
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

  it("Should handle redirections if the URL contains a query string", async () => {
    store.state.router.redirections = "404";

    await store.actions.source.fetch("/some-post?key=value&key2=value2");

    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "/some-post/?key=value&key2=value2": Object {
          "is301": true,
          "isFetching": false,
          "isReady": true,
          "isRedirection": true,
          "link": "/some-post/?key=value&key2=value2",
          "location": "/redirected-url/?key=value&key2=value2",
          "page": 1,
          "query": Object {
            "key": "value",
            "key2": "value2",
          },
          "route": "/some-post/",
        },
      }
    `);
  });
});

describe("redirections: RegExp", () => {
  it("Should work in when the redirection is a single regex", async () => {
    store.state.router.redirections = "RegExp:/some-post";

    // The handler throws a 404.
    handler.func = jest.fn(() => {
      throw new ServerError("There was an error", 404);
    }) as any;

    await store.actions.source.fetch("/some-post");

    // the `fetch()` was called.
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

    expect(handler.func).toHaveBeenCalledTimes(1);
    // The fetch was called before the handler.
    expect(mockedFetch.mock.invocationCallOrder[0]).toBeLessThan(
      handler.func.mock.invocationCallOrder[0]
    );

    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "/some-post/": Object {
          "is301": true,
          "isFetching": false,
          "isReady": true,
          "isRedirection": true,
          "link": "/some-post/",
          "location": "/redirected-url/",
          "page": 1,
          "query": Object {},
          "route": "/some-post/",
        },
      }
    `);
  });

  it("Should just return a 404 if the redirection does not match the regex", async () => {
    store.state.router.redirections = "RegExp:/some-other-post";

    // The handler throws a 404.
    handler.func = jest.fn(() => {
      throw new ServerError("There was an error", 404);
    }) as any;

    await store.actions.source.fetch("/some-post");

    // the `fetch()` was NOT called
    expect(mockedFetch).toHaveBeenCalledTimes(0);
    expect(handler.func).toHaveBeenCalledTimes(1);

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

  it("Should do stuff", () => {});
});
