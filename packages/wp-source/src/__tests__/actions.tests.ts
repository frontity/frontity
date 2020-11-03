import { createStore, observe, InitializedStore } from "@frontity/connect";
import Router from "@frontity/router/types";

import merge from "deepmerge";
import clone from "clone-deep";

import wpSource from "../";
import WpSource, { Pattern, Handler } from "../../types";
import * as handlers from "../libraries/handlers";
import { getMatch } from "../libraries/get-match";

// Create mock for handler generators
jest.mock("../libraries/handlers");

const handlerMocks = handlers as jest.Mocked<typeof handlers>;
handlerMocks.taxonomyHandler.mockReturnValue(jest.fn());
handlerMocks.postTypeHandler.mockReturnValue(jest.fn());
handlerMocks.postTypeArchiveHandler.mockReturnValue(jest.fn());
handlerMocks.postTypeWithQueryHandler.mockReturnValue(jest.fn());

let handler: jest.Mocked<Pattern<Handler>>;
let store: InitializedStore<WpSource & Router>;

beforeEach(() => {
  // Reset mocks
  handlerMocks.taxonomyHandler.mockClear();
  handlerMocks.postTypeHandler.mockClear();
  handlerMocks.postTypeArchiveHandler.mockClear();
  handlerMocks.postTypeWithQueryHandler.mockClear();
  // Create a mock handler
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

  store.state.source.api = "https://test.frontity.org/wp-json";

  // Add mock handler to the store
  store.libraries.source.handlers.push(handler);
});

describe("actions.source.fetch", () => {
  test("should work if data doesn't exist", async () => {
    await store.actions.source.fetch("/some/route/");
    expect(handler.func).toHaveBeenCalledTimes(1);
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("does nothing if data exists", async () => {
    store.state.source.data["/some/route/"] = {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: false,
      isReady: true,
    };

    await store.actions.source.fetch("/some/route/");
    expect(handler.func).not.toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should switch isFetching and isReady even if data exists", async () => {
    store.state.source.data["/some/route/"] = {
      isFetching: false,
      isReady: false,
    };
    const fetching = store.actions.source.fetch("/some/route/");
    expect(store.state.source.get("/some/route").isFetching).toBe(true);
    expect(store.state.source.get("/some/route").isReady).toBe(false);
    await fetching;
    expect(store.state.source.get("/some/route").isFetching).toBe(false);
    expect(store.state.source.get("/some/route").isReady).toBe(true);
  });

  test('should set isHome in "/"', (done) => {
    observe(() => {
      const data = store.state.source.get("/");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/");
  });

  test('should set isHome in "/page/x"', (done) => {
    observe(() => {
      const data = store.state.source.get("/page/123");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/page/123");
  });

  test('should set isHome in "/blog" when using a subdirectory', (done) => {
    store.state.source.subdirectory = "/blog";
    observe(() => {
      const data = store.state.source.get("/blog");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/blog");
  });

  test('should set isHome in "/blog/page/x" when using a subdirectory', (done) => {
    store.state.source.subdirectory = "/blog";
    observe(() => {
      const data = store.state.source.get("/blog/page/123");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/blog/page/123");
  });

  test('should set isHome in "/" when a redirection has matched', (done) => {
    store.libraries.source.redirections = [
      {
        name: "homepage",
        priority: 10,
        pattern: "/",
        func: () => "/front-page/",
      },
    ];

    observe(() => {
      const data = store.state.source.get("/");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/");
  });

  test('should set isHome in "/page/x/" when a redirection has matched', (done) => {
    store.libraries.source.redirections = [
      {
        name: "homepage",
        priority: 10,
        pattern: "/",
        func: () => "/front-page/",
      },
    ];

    observe(() => {
      const data = store.state.source.get("/page/123");
      if (data.isReady) {
        expect(data.isHome).toBe(true);
        done();
      }
    });
    store.actions.source.fetch("/page/123");
  });

  test("should run again when `force` is used", async () => {
    store.state.source.data["/some/route/"] = {
      errorStatusText: "Request Timeout",
      errorStatus: 408,
      isError: true,
      isFetching: false,
      isReady: true,
    };

    await store.actions.source.fetch("/some/route/", { force: true });
    expect(handler.func).toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("Throw an error if fetch fails", async () => {
    handler.func = jest.fn(async (_) => {
      throw new Error("Some error");
    });

    try {
      await store.actions.source.fetch("/some/route/");
      throw new Error("This should not be reached");
    } catch (e) {
      expect(e.message).toBe("Some error");
    }
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should allow to observe 'isReady' properly", (done) => {
    expect(store.state.source.get("/").isReady).toBe(false);
    observe(() => {
      if (store.state.source.get("/").isReady) done();
    });
    store.actions.source.fetch("/");
  });

  test("should allow to observe 'isFetching' properly", (done) => {
    expect(store.state.source.get("/").isFetching).toBe(false);
    store.actions.source.fetch("/");
    expect(store.state.source.get("/").isFetching).toBe(true);
    observe(() => {
      const { isFetching } = store.state.source.get("/");
      if (!isFetching) done();
    });
  });

  test("Should throw a 404 error if no handler matched the link", async () => {
    await store.actions.source.fetch("@unknown/link");
    expect(store.state.source.data).toMatchInlineSnapshot(`
      Object {
        "@unknown/link/": Object {
          "errorStatus": 404,
          "errorStatusText": "No handler has matched for the given link: \\"@unknown/link/\\"",
          "is404": true,
          "isError": true,
          "isFetching": false,
          "isReady": true,
        },
      }
    `);
  });
});

describe("actions.source.init", () => {
  test("should add redirect for the specified homepage", async () => {
    store.state.source.homepage = "/about-us/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for the specified posts page", async () => {
    store.state.source.postsPage = "/all-posts/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for categories if 'categoryBase' is set", async () => {
    store.state.source.categoryBase = "wp-cat";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
    // Test that the redirection works.
    const link = "/wp-cat/travel/";
    const redirect = getMatch(link, store.libraries.source.redirections);
    expect(redirect).toBeTruthy();
    expect(redirect.func(redirect.params)).toBe("/category/travel/");
  });

  test("should add redirect for tags if 'tagBase' is set", async () => {
    store.state.source.tagBase = "wp-tag";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
    // Test that the redirection works.
    const link = "/wp-tag/paris/";
    const redirect = getMatch(link, store.libraries.source.redirections);
    expect(redirect).toBeTruthy();
    expect(redirect.func(redirect.params)).toBe("/tag/paris/");
  });

  test("should add redirect for tags if 'authorBase' is set", async () => {
    store.state.source.authorBase = "/blog/author";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
    // Test that the redirection works.
    const link = "/blog/author/admin/";
    const redirect = getMatch(link, store.libraries.source.redirections);
    expect(redirect).toBeTruthy();
    expect(redirect.func(redirect.params)).toBe("/author/admin/");
  });

  test("should add redirect if 'subirectory' is present", async () => {
    store.state.source.homepage = "/about-us/";
    store.state.source.postsPage = "/all-posts/";
    store.state.source.categoryBase = "wp-cat";
    store.state.source.tagBase = "wp-tag";
    store.state.source.subdirectory = "blog";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add new handlers from postTypes array", async () => {
    store.state.source.postTypes.push(
      {
        type: "cpt1",
        endpoint: "cpts1",
      },
      {
        type: "cpt2",
        endpoint: "cpts2",
        archive: "cpt2-archive",
      }
    );

    await store.actions.source.init();

    expect(store.libraries.source.handlers).toMatchSnapshot();
    expect(handlerMocks.postTypeHandler.mock.calls).toMatchSnapshot();
    expect(handlerMocks.postTypeArchiveHandler.mock.calls).toMatchSnapshot();
    expect(handlerMocks.postTypeWithQueryHandler.mock.calls).toMatchSnapshot();
  });

  test("should add new handlers from taxonomies array", async () => {
    store.state.source.taxonomies.push(
      {
        taxonomy: "taxonomy1",
        endpoint: "taxonomies1",
      },
      {
        taxonomy: "taxonomy2",
        endpoint: "taxonomies2",
        postTypeEndpoint: "cpt",
      },
      {
        taxonomy: "taxonomy3",
        endpoint: "taxonomies3",
        postTypeEndpoint: "multiple-post-type",
        params: {
          type: ["posts", "cpts"],
        },
      }
    );

    await store.actions.source.init();

    expect(store.libraries.source.handlers).toMatchSnapshot();
    expect(handlerMocks.taxonomyHandler.mock.calls).toMatchSnapshot();
  });

  test("should populate link, route, page and query even if data exists", async () => {
    store.state.source.data["/some/route/page/2/?a=b"] = {
      isFetching: false,
      isReady: false,
    };

    await store.actions.source.fetch("/some/route/page/2/?a=b");

    const { link, route, page, query } = store.state.source.get(
      "/some/route/page/2/?a=b"
    );

    expect(link).toEqual("/some/route/page/2/?a=b");
    expect(route).toEqual("/some/route/");
    expect(page).toEqual(2);
    expect(query).toEqual({ a: "b" });
  });

  test("state.data['/some/route/'].isReady should stay true when fetching with { force: true }", async () => {
    // Get initial data into the store
    store.state.source.data["/some/route/"] = {
      isFetching: false,
      isReady: true,
    };

    const fetchLink = store.actions.source.fetch("/some/route/", {
      force: true,
    });

    // Normally this would be `false` if we hadn't already fetched the data
    expect(store.state.source.data["/some/route/"].isReady).toBe(true);

    await fetchLink;

    // It should stay `true` after having fetched, obviously
    expect(store.state.source.data["/some/route/"].isReady).toBe(true);
  });

  test("state.data['/some/route/'].isCategory should be removed when fetching with { force: true }", async () => {
    // Get initial data into the store
    const initialData: any = {
      isArchive: true,
      isTaxonomy: true,
      isCategory: true,
      taxonomy: "category",
      items: [],
      isReady: true,
      isFetching: false,
    };

    store.state.source.data["/some/route/"] = initialData;

    handler.func = jest.fn(async ({ route, state }) => {
      await Promise.resolve();
      Object.assign(state.source.data[route], {
        isFetching: true,
        isReady: true,
      });
    });

    expect(store.state.source.data["/some/route/"].isCategory).toBe(true);
    expect((store.state.source.data["/some/route/"] as any).items).toEqual([]);

    await store.actions.source.fetch("/some/route/", {
      force: true,
    });

    const data = store.state.source.get("/some/route/");

    // NOTE!!! This should fail in wp-source 2.0, because `isCategory` and `items` should be removed
    expect(data).toMatchSnapshot();

    // NOTE!!! This should fail in wp-source 2.0, because `isCategory` and `items` should be removed
    expect(data.isCategory).toBe(true);
    expect((data as any).items).toEqual([]);
  });

  test("Errors for state.data['/some/route/'] should be removed when fetching with { force: true }", async () => {
    // Get initial data into the store
    store.state.source["/some/route/"] = {
      isError: true,
      errorStatusText: "Some error",
      errorStatus: 404,
      isReady: true,
      isFetching: false,
    };

    await store.actions.source.fetch("/some/route/", {
      force: true,
    });

    const data = store.state.source.get("/some/route/");

    expect(data).toMatchSnapshot();

    expect(data.isError).toBeUndefined();
    expect((data as any).errorStatus).toBeUndefined();
    expect((data as any).errorStatusText).toBeUndefined();
  });
});
