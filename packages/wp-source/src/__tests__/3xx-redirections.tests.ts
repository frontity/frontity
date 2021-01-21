/* eslint-disable @typescript-eslint/no-namespace */
import * as frontity from "frontity";
import clone from "clone-deep";
import { InitializedStore, createStore } from "@frontity/connect";
import { Pattern, Handler, Packages } from "../../types";
import wpSource from "..";
import { ServerError } from "@frontity/source";
import { RedirectionData } from "@frontity/source/types/data";
import { Headers } from "node-fetch";

let handler: jest.Mocked<Pattern<Handler>>;
let store: InitializedStore<Packages>;
let mockedFetch: jest.MockedFunction<typeof fetch>;

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledBefore(func: any): R;
    }
  }
}

/**
 * Add a `.toHaveBeenCalledBefore()` matcher to jest to make the tests more
 * clear.
 */
expect.extend({
  toHaveBeenCalledBefore(first, second) {
    if (
      first.mock.invocationCallOrder[0] < second.mock.invocationCallOrder[0]
    ) {
      return {
        message: () => `expected ${first} to have been called before ${second}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${first} to have been called before ${second}`,
        pass: false,
      };
    }
  },
});

const serverFetchParams = [
  "https://wp.domain.com/some-post/",
  {
    method: "HEAD",
    redirect: "manual",
  },
];
const serverResponse = {
  status: 301,
  headers: new Headers({
    location: "https://wp.domain.com/redirected-url",
  }),
};
const clientFetchParams = [
  "https://wp.domain.com/some-post/",
  {
    method: "HEAD",
  },
];
const clientResponse = {
  url: "https://wp.domain.com/redirected-url",
  redirected: true,
  status: 200,
};

describe.each`
  platform    | fetchRedirectionParams | response
  ${"server"} | ${serverFetchParams}   | ${serverResponse}
  ${"client"} | ${clientFetchParams}   | ${clientResponse}
`("Redirection tests", ({ platform, fetchRedirectionParams, response }) => {
  beforeEach(() => {
    mockedFetch = jest.fn((_) =>
      Promise.resolve((response as unknown) as Response)
    );
    (frontity.fetch as typeof fetch) = mockedFetch;

    // Initialize the store.
    store = createStore<Packages>(clone(wpSource()));
    store.state.source.url = "https://wp.domain.com";
    store.state.frontity = {
      platform,
      url: "https://www.domain.com/",
    };

    handler = {
      name: "always",
      priority: 10,
      pattern: "/(.*)",
      func: jest.fn(async ({ link, state }) => {
        await Promise.resolve();
        Object.assign(state.source.data[link], {
          type: "example",
          id: 1,
          isPostType: true,
        });
      }),
    };

    store.libraries.source.handlers.push(handler);
  });

  describe("redirections: all", () => {
    it(`${platform}: Should handle a redirect with 'all'`, async () => {
      store.state.source.redirections = "all";

      await store.actions.source.fetch("/some-post/");

      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).not.toHaveBeenCalled();

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
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

    it(`${platform}: Should ignore the redirection if there is no error`, async () => {
      store.state.source.redirections = "404";

      // Restore the handler to the original implementation.
      handler.func.mockRestore();

      await store.actions.source.fetch("/some-post/");

      expect(mockedFetch).not.toHaveBeenCalled();
      expect(handler.func).toHaveBeenCalledTimes(1);
    });

    it(`${platform}: Should NOT redirect on an error that is not a 404`, async () => {
      store.state.source.redirections = "404";

      // Throw a 500 inside of the handler.
      handler.func = jest.fn(() => {
        throw new ServerError("There was an error", 500);
      }) as any;

      await store.actions.source.fetch("/some-post/");

      expect(mockedFetch).not.toHaveBeenCalled();
      expect(handler.func).toHaveBeenCalledTimes(1);
    });

    it(`${platform}: Should redirect on 404`, async () => {
      store.state.source.redirections = "404";

      await store.actions.source.fetch("/some-post/");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).toHaveBeenCalledTimes(1);
      expect(handler.func).toHaveBeenCalledBefore(mockedFetch);

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should redirect on 404 when the redirection is a 302 redirection`, async () => {
      store.state.source.redirections = "404";

      if (platform === "server") {
        mockedFetch = jest.fn((_) =>
          Promise.resolve(({
            ...serverResponse,
            status: 302,
          } as unknown) as Response)
        );
      }

      (frontity.fetch as typeof fetch) = mockedFetch;

      await store.actions.source.fetch("/some-post/");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).toHaveBeenCalledTimes(1);
      expect(handler.func).toHaveBeenCalledBefore(mockedFetch);

      const snapshot = `
        Object {
          "/some-post/": Object {
            "is30${platform === "server" ? "2" : "1"}": true,
            "isExternal": false,
            "isFetching": false,
            "isReady": true,
            "isRedirection": true,
            "link": "/some-post/",
            "location": "https://wp.domain.com/redirected-url",
            "page": 1,
            "query": Object {},
            "redirectionStatus": 30${platform === "server" ? "2" : "1"},
            "route": "/some-post/",
          },
        }
      `;

      const is302 = platform === "server";
      const is301 = platform === "client";
      const data = store.state.source.data["/some-post/"] as RedirectionData;

      expect(!!data.is302).toBe(is302);
      expect(!!data.is301).toBe(is301);
      expect(store.state.source.data).toMatchInlineSnapshot(snapshot);
    });

    it(`${platform}: Should return a normal 404 error if fetching the redirection fails`, async () => {
      store.state.source.redirections = "404";

      // Fetching the redirection fails.
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
                  "link": "/some-post/",
                  "page": 1,
                  "query": Object {},
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should handle redirections if the URL contains a query string`, async () => {
      store.state.source.redirections = "404";

      await store.actions.source.fetch("/some-post?key=value&key2=value2");

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/?key=value&key2=value2": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/?key=value&key2=value2",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {
                    "key": "value",
                    "key2": "value2",
                  },
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });
  });

  describe("redirections: RegExp and RegExp[]", () => {
    beforeEach(() => {
      // The handler throws a 404.
      handler.func = jest.fn(() => {
        throw new ServerError("There was an error", 404);
      }) as any;
    });

    it(`${platform}: Should fetch the redirection when the redirection is a single regex`, async () => {
      store.state.source.redirections = "RegExp:/some-(\\w*)";
      await store.actions.source.fetch("/some-post");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).not.toHaveBeenCalled();

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should match the redirection with pagination and queries`, async () => {
      store.state.source.redirections = "RegExp:/some-(\\w*)";
      await store.actions.source.fetch("/some-post");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(handler.func).not.toHaveBeenCalled();

      store.state.source.redirections =
        "RegExp:\\/category\\/some-cat\\/page\\/[2,3]";
      await store.actions.source.fetch("/category/some-cat/page/2");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(2);
      expect(handler.func).not.toHaveBeenCalled();

      await store.actions.source.fetch("/category/some-cat/page/5");

      // The `fetch()` was not called.
      expect(mockedFetch).toHaveBeenCalledTimes(2);
      expect(handler.func).toHaveBeenCalledTimes(1);

      store.state.source.redirections = ["RegExp:(\\?|&)p=(\\d+)"];
      await store.actions.source.fetch("/?p=123&preview=true");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(3);
      expect(handler.func).toHaveBeenCalledTimes(1);

      await store.actions.source.fetch("/?page_id=123&preview=true");

      // The `fetch()` was not called.
      expect(mockedFetch).toHaveBeenCalledTimes(3);
      expect(handler.func).toHaveBeenCalledTimes(2);
    });

    it(`${platform}: Should just return a 404 if the redirection does not match the regex`, async () => {
      store.state.source.redirections = "RegExp:/some-other-post";
      await store.actions.source.fetch("/some-post");

      // The `fetch()` was NOT called.
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
                  "link": "/some-post/",
                  "page": 1,
                  "query": Object {},
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should fetch the redirection when the redirection is an array of regexes`, async () => {
      store.state.source.redirections = [
        "RegExp:/some-(.*)",
        "RegExp:/some-other-post",
      ];
      await store.actions.source.fetch("/some-post");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).not.toHaveBeenCalled();

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should fetch the redirection when the redirection is an array of regexes that includes a 404 AND the regex does NOT match the route`, async () => {
      store.state.source.redirections = [
        "404",
        "RegExp:/some-other-post", // This regex does not match
      ];
      await store.actions.source.fetch("/some-post");

      // The `fetch()` was called.
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).toHaveBeenCalledTimes(1);

      // The handler was called before the fetch because there was no match for
      // the redirection regex so we only fetch the redirection once the error is thrown.
      expect(handler.func).toHaveBeenCalledBefore(mockedFetch);

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should fetch the redirection when the redirection is an array of regexes that includes a 404 AND the regex matches a route`, async () => {
      store.state.source.redirections = [
        "404",
        "RegExp:/some-(\\w*)", // This regex DOES match
      ];
      await store.actions.source.fetch("/some-post");

      // We only call the fetch once, even though we include the
      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(...fetchRedirectionParams);

      expect(handler.func).not.toHaveBeenCalled();

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });
  });

  describe("redirections: external", () => {
    it(`${platform}: Should not mark the Frontity URLs as external redirections`, async () => {
      store.state.source.redirections = "all";

      if (platform === "server") {
        mockedFetch = jest.fn((_) =>
          Promise.resolve(({
            status: 301,
            headers: new Headers({
              location: "https://www.domain.com/redirected-url",
            }),
          } as unknown) as Response)
        );
      } else {
        mockedFetch = jest.fn((_) =>
          Promise.resolve({
            url: "https://www.domain.com/redirected-url",
            redirected: true,
            status: 200,
          } as Response)
        );
      }

      (frontity.fetch as typeof fetch) = mockedFetch;

      await store.actions.source.fetch("/some-post/");

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://www.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should not mark backend URLs as external redirections`, async () => {
      store.state.source.redirections = "all";

      if (platform === "server") {
        mockedFetch = jest.fn((_) =>
          Promise.resolve(({
            status: 301,
            headers: new Headers({
              location: "https://wp.domain.com/redirected-url",
            }),
          } as unknown) as Response)
        );
      } else {
        mockedFetch = jest.fn((_) =>
          Promise.resolve({
            url: "https://wp.domain.com/redirected-url",
            redirected: true,
            status: 200,
          } as Response)
        );
      }

      (frontity.fetch as typeof fetch) = mockedFetch;

      await store.actions.source.fetch("/some-post/");

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": false,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://wp.domain.com/redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should mark external redirections`, async () => {
      store.state.source.redirections = "all";

      if (platform === "server") {
        mockedFetch = jest.fn((_) =>
          Promise.resolve(({
            status: 301,
            headers: new Headers({
              location: "https://external-domain.com/external-redirected-url",
            }),
          } as unknown) as Response)
        );
      } else {
        mockedFetch = jest.fn((_) =>
          Promise.resolve({
            url: "https://external-domain.com/external-redirected-url",
            redirected: true,
            status: 200,
          } as Response)
        );
      }

      (frontity.fetch as typeof fetch) = mockedFetch;

      await store.actions.source.fetch("/some-post/");

      expect(store.state.source.data).toMatchInlineSnapshot(`
              Object {
                "/some-post/": Object {
                  "is301": true,
                  "isExternal": true,
                  "isFetching": false,
                  "isReady": true,
                  "isRedirection": true,
                  "link": "/some-post/",
                  "location": "https://external-domain.com/external-redirected-url",
                  "page": 1,
                  "query": Object {},
                  "redirectionStatus": 301,
                  "route": "/some-post/",
                },
              }
          `);
    });

    it(`${platform}: Should mark redirections as external if they fail due to CORS`, async () => {
      store.state.source.redirections = "all";

      if (platform === "server") {
        mockedFetch = jest.fn((_) =>
          Promise.resolve(({
            status: 301,
            headers: new Headers({
              location: "https://external-domain.com/external-redirected-url",
            }),
          } as unknown) as Response)
        );
      } else {
        mockedFetch = jest
          .fn()
          // Fetching the redirection fails first due to CORS.
          .mockRejectedValueOnce("Fetch Error")
          // Then the next fetch done with `redirect: manual` returns the
          // opaqueredirect value.
          .mockResolvedValueOnce({
            url: "https://wp.domain.com/some-post/",
            type: "opaqueredirect",
            status: 0,
          });
      }

      (frontity.fetch as typeof fetch) = mockedFetch;

      await store.actions.source.fetch("/some-post/");

      const snapshot = `
      Object {
        "/some-post/": Object {
          "is301": true,
          "isExternal": true,
          "isFetching": false,
          "isReady": true,
          "isRedirection": true,
          "link": "/some-post/",
          "location": ${
            platform === "server"
              ? '"https://external-domain.com/external-redirected-url"'
              : '"https://wp.domain.com/some-post/"'
          },
          "page": 1,
          "query": Object {},
          "redirectionStatus": 301,
          "route": "/some-post/",
        },
      }
    `;

      expect(store.state.source.data).toMatchInlineSnapshot(snapshot);
    });
  });
});
