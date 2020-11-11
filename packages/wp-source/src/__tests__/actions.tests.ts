import { createStore, observe, InitializedStore } from "@frontity/connect";
import Router from "@frontity/router/types";

import merge from "deepmerge";
import clone from "clone-deep";

import wpSource from "../";
import WpSource, { Pattern, Handler } from "../../types";
import * as handlers from "../libraries/handlers";
import { getMatch } from "../libraries/get-match";
import { Data, CategoryData, ErrorData } from "@frontity/source/types";
import { isCategory, isError, isHome } from "@frontity/source";

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
    func: jest.fn(async ({ link, state }) => {
      await Promise.resolve();
      Object.assign(state.source.data[link], {
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

/**
 * Helper that returns a link's data when the given prop has the given value.
 *
 * @param link - Link in the Frontity site.
 * @param props - Props and their values to check.
 * @returns Promise with the data object when is ready.
 */
const observeData = (link: string, props: Partial<Data>): Promise<Data> =>
  new Promise((resolve) => {
    observe(() => {
      const data = store.state.source.get(link);

      // Exit if some condition fails.
      for (const prop in props) {
        if (!data[prop] === props[prop]) return;
      }

      // Resolve only when all conditions are true.
      resolve(data);
    });
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
      link: "/some/route/",
      route: "/some/route/",
      page: 1,
      query: {},
    } as Data;

    await store.actions.source.fetch("/some/route/");
    expect(handler.func).not.toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should switch isFetching and isReady even if data exists", async () => {
    store.state.source.data["/some/route/"] = {
      isFetching: false,
      isReady: false,
      link: "/some/route/",
      route: "/some/route/",
      page: 1,
      query: {},
    };
    const fetching = store.actions.source.fetch("/some/route/");
    expect(store.state.source.get("/some/route").isFetching).toBe(true);
    expect(store.state.source.get("/some/route").isReady).toBe(false);
    await fetching;
    expect(store.state.source.get("/some/route").isFetching).toBe(false);
    expect(store.state.source.get("/some/route").isReady).toBe(true);
  });

  test('should set isHome in "/"', async () => {
    const promisedData = observeData("/", { isReady: true });
    store.actions.source.fetch("/");
    expect(isHome(await promisedData)).toBe(true);
  });

  test('should set isHome in "/page/x"', async () => {
    const promisedData = observeData("/page/123", { isReady: true });
    store.actions.source.fetch("/page/123");
    expect(isHome(await promisedData)).toBe(true);
  });

  test('should set isHome in "/blog" when using a subdirectory', async () => {
    store.state.source.subdirectory = "/blog";
    const promisedData = observeData("/blog", { isReady: true });
    store.actions.source.fetch("/blog");
    expect(isHome(await promisedData)).toBe(true);
  });

  test('should set isHome in "/blog/page/x" when using a subdirectory', async () => {
    store.state.source.subdirectory = "/blog";
    const promisedData = observeData("/blog/page/123", { isReady: true });
    store.actions.source.fetch("/blog/page/123");
    expect(isHome(await promisedData)).toBe(true);
  });

  test('should set isHome in "/" when a redirection has matched', async () => {
    store.libraries.source.redirections = [
      {
        name: "homepage",
        priority: 10,
        pattern: "/",
        func: () => "/front-page/",
      },
    ];

    const promisedData = observeData("/", { isReady: true });
    store.actions.source.fetch("/");
    expect(isHome(await promisedData)).toBe(true);
  });

  test('should set isHome in "/page/x/" when a redirection has matched', async () => {
    store.libraries.source.redirections = [
      {
        name: "homepage",
        priority: 10,
        pattern: "/",
        func: () => "/front-page/",
      },
    ];

    const promisedData = observeData("/page/123", { isReady: true });
    store.actions.source.fetch("/page/123");
    expect(isHome(await promisedData)).toBe(true);
  });

  test("should run again when `force` is used", async () => {
    store.state.source.data["/some/route/"] = {
      errorStatusText: "Request Timeout",
      errorStatus: 408,
      isError: true,
      isFetching: false,
      isReady: true,
      link: "/some/route/",
      query: {},
    } as ErrorData;

    await store.actions.source.fetch("/some/route/", { force: true });
    expect(handler.func).toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("Throw an error if fetch fails", async () => {
    handler.func = jest.fn(async (_) => {
      throw new Error("Handler error");
    });

    let error: Error;

    try {
      await store.actions.source.fetch("/some/route/");
      throw new Error("This should not be reached");
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe("Handler error");
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should allow to observe 'isReady' properly", async () => {
    expect(store.state.source.get("/").isReady).toBe(false);

    // `observeData` uses `observe`.
    const promisedData = observeData("/", { isReady: true });
    store.actions.source.fetch("/");
    await promisedData;
  });

  test("should allow to observe 'isFetching' properly", async () => {
    expect(store.state.source.get("/").isFetching).toBe(false);
    store.actions.source.fetch("/");
    expect(store.state.source.get("/").isFetching).toBe(true);

    // `observeData` uses `observe`.
    const promisedData = observeData("/", { isFetching: false });
    await promisedData;
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
          "link": "@unknown/link/",
          "page": 1,
          "query": Object {},
          "route": "@unknown/link/",
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
      link: "/some/route/page/2/?a=b",
      route: "/some/route/",
      page: 2,
      query: { a: "b" },
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
      link: "/some/route/",
      route: "/some/route/",
      page: 1,
      query: {},
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
    const initialData: CategoryData = {
      isArchive: true,
      isTerm: true,
      isCategory: true,
      taxonomy: "category",
      id: 7,
      items: [],
      isReady: true,
      isFetching: false,
      link: "/some/route/",
      query: {},
      route: "/some/route/",
      page: 1,
    };

    store.state.source.data["/some/route/"] = initialData;

    handler.func = jest.fn(async ({ link, state }) => {
      await Promise.resolve();
      Object.assign(state.source.data[link], {
        isFetching: true,
        isReady: true,
      });
    });

    expect(isCategory(store.state.source.data["/some/route/"])).toBe(true);
    expect((store.state.source.data["/some/route/"] as any).items).toEqual([]);

    await store.actions.source.fetch("/some/route/", {
      force: true,
    });

    const data = store.state.source.get("/some/route/");

    // NOTE!!! This should fail in wp-source 2.0, because `isCategory` and `items` should be removed
    expect(data).toMatchSnapshot();

    // NOTE!!! This should fail in wp-source 2.0, because `isCategory` and `items` should be removed
    expect(isCategory(data)).toBe(true);
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

    expect(isError(data)).toBe(false);
    expect((data as any).errorStatus).toBeUndefined();
    expect((data as any).errorStatusText).toBeUndefined();
  });
});
