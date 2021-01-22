import * as frontity from "frontity";
import * as frontityError from "@frontity/error";
import { Context } from "frontity/types";
import tinyRouter from "..";
import { Packages } from "../../types";
import { SetOptions } from "@frontity/router/types";
import { RedirectionData } from "@frontity/source/types";

let config: any;
let normalize: jest.Mock;
let fetch: jest.Mock;
let get: jest.Mock;

const createStore = (config) => frontity.createStore<Packages>(config);

beforeEach(() => {
  normalize = jest.fn().mockImplementation((link) => {
    const { pathname, hash, search } = new URL(link, "https://dummy.com");
    return pathname + hash + search;
  });
  fetch = jest.fn();
  get = jest.fn().mockReturnValue({ isReady: false, isFetching: false });

  config = {
    name: "@frontity/tiny-router",
    state: {
      frontity: {
        platform: "server",
        initialLink: "/initial/link/",
      },
      router: { ...tinyRouter.state.router },
      source: {
        get: () => get,
        data: {},
      },
    },
    actions: {
      router: {
        ...tinyRouter.actions.router,
      },
      source: {
        fetch: () => fetch,
      },
    },
    libraries: {
      source: {
        normalize,
      },
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("actions", () => {
  describe("set", () => {
    it("should work just with links", () => {
      const store = createStore(config);
      const link = "/some-post/";

      store.actions.router.set(link);

      expect(normalize).toHaveBeenCalledWith(link);
      expect(store.state.router.link).toBe(link);
    });

    it("should work with full URLs", () => {
      const store = createStore(config);
      const link = "https://blog.example/some-post/page/3/?some=query";

      store.actions.router.set(link);

      expect(normalize).toHaveBeenCalledWith(link);
      expect(store.state.router.link).toBe("/some-post/page/3/?some=query");
    });

    it("should populate latest link, method and state", () => {
      const store = createStore(config);
      const link = "/some-post/";
      const options: SetOptions = {
        method: "replace",
        state: {
          initial: 1,
          pages: [1, 2, 3],
        },
      };

      store.actions.router.set(link, options);

      expect(store.state.router.link).toBe(link);
      expect(store.state.router.state).toEqual(options.state);
    });

    it("should follow the `options.method` in the client", () => {
      const store = createStore(config);
      store.state.frontity.platform = "client";

      const link = "/some-post/";
      const options: SetOptions = {
        method: "push",
      };

      jest.spyOn(window.history, "pushState");

      store.actions.router.set(link, options);
      expect(window.history.pushState).toHaveBeenCalledTimes(1);

      options.method = "replace";
      jest.spyOn(window.history, "replaceState");

      store.actions.router.set(link, options);
      expect(window.history.replaceState).toHaveBeenCalledTimes(1);
    });

    it("should clone the history state and store it in `window.history`", () => {
      const store = createStore(config);
      store.state.frontity.platform = "client";

      const link = "/some-post/";
      const options: SetOptions = {
        method: "push",
        state: {
          initial: 1,
          pages: [1, 2, 3],
        },
      };

      store.actions.router.set(link, options);
      expect(store.state.router.state).toEqual(options.state);
      expect(window.history.state).toEqual(options.state);
      expect(window.history.state).not.toBe(options.state);
      expect(window.history.state.pages).not.toBe(options.state.pages);

      options.method = "replace";

      store.actions.router.set(link, options);
      expect(store.state.router.state).toEqual(options.state);
      expect(window.history.state).toEqual(options.state);
      expect(window.history.state).not.toBe(options.state);
      expect(window.history.state.pages).not.toBe(options.state.pages);
    });

    it("should fetch if `autoFetch` is enabled", () => {
      const store = createStore(config);
      store.state.frontity.platform = "client";

      let link = "/first-link/";

      store.actions.router.set(link);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenLastCalledWith(link);

      link = "/second-link/";

      store.actions.router.set(link, { method: "replace" });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenLastCalledWith(link);
    });

    it("should redirect to the final link if there is an internal redirection", () => {
      const store = createStore(config);

      get.mockReturnValue({
        isReady: true,
        isFetching: false,
        link: "/initial-url/",
        route: "/initial-url/",
        page: 1,
        query: {},
        isRedirection: true,
        isExternal: false,
        location: "https://backend.com/final-url/",
      });

      store.actions.router.set("/initial-url");

      expect(store.state.router.link).toBe("/final-url/");
    });

    it("should redirect to the final link if there is an external redirection", () => {
      const store = createStore(config);

      get.mockReturnValue({
        isReady: true,
        isFetching: false,
        link: "/initial-url/",
        route: "/initial-url/",
        page: 1,
        query: {},
        isRedirection: true,
        isExternal: true,
        location: "https://external.com/final-url",
      });

      window.replaceLocation = jest.fn();

      store.actions.router.set("/initial-url");

      expect(window.replaceLocation).toHaveBeenCalledWith(
        "https://external.com/final-url"
      );
    });
  });

  describe("init", () => {
    it("should populate the initial link", () => {
      const store = createStore(config);

      store.actions.router.init();

      // check that first state is correct
      expect(normalize).toHaveBeenCalledTimes(1);
      expect(normalize).toHaveBeenCalledWith("/initial/link/");
      expect(store.state.router.link).toBe("/initial/link/");
    });

    it("should fire `replaceState` in the init to populate the history state", () => {
      config.state.frontity.platform = "client";
      const store = createStore(config);
      store.state.router.state = { some: "state" };

      jest.spyOn(window.history, "replaceState");

      store.actions.router.init();

      expect(window.history.replaceState).toHaveBeenCalledTimes(1);
      expect(window.history.state).toEqual(store.state.router.state);
    });

    it('should add event handler for "popstate" events', () => {
      config.state.frontity.platform = "client";
      const store = createStore(config);
      store.actions.router.init();

      const pathname = "/about-us/";
      const search = "?id=3&search=value";
      const hash = "#element";
      const link = pathname + hash + search;

      const oldLocation = window.location;
      delete window.location;
      (window.location as any) = { pathname, search, hash };

      // Checks that there is an event listener handleling `popstate`.
      window.dispatchEvent(
        new PopStateEvent("popstate", { state: { some: "different state" } })
      );

      expect(store.state.router.link).toBe(link);
      expect(store.state.router.state).toEqual({ some: "different state" });
      expect(store.state.router.state).not.toBe({ some: "different state" });

      window.location = oldLocation;
    });

    it("should trigger a new `action.router.set` if the current data object is an internal redirection", () => {
      config.state.frontity.platform = "client";
      const store = createStore(config);
      get.mockImplementation((_) => store.state.source.data["/"]);

      store.actions.router.init();

      const redirection: RedirectionData = {
        isReady: true,
        isFetching: false,
        link: "/initial-url/",
        route: "/initial-url/",
        page: 1,
        query: {},
        isRedirection: true,
        redirectionStatus: 301,
        isExternal: false,
        location: "https://backend.com/final-url/",
      };
      store.state.source.data["/"] = redirection;

      expect(store.state.router.link).toBe("/final-url/");
    });

    it("should do SSR if the current data object is an external redirection", () => {
      config.state.frontity.platform = "client";
      const store = createStore(config);
      get.mockImplementation((_) => store.state.source.data["/"]);
      window.replaceLocation = jest.fn();

      store.actions.router.init();

      const redirection: RedirectionData = {
        isReady: true,
        isFetching: false,
        link: "/initial-url/",
        route: "/initial-url/",
        page: 1,
        query: {},
        isRedirection: true,
        redirectionStatus: 301,
        isExternal: true,
        location: "https://external.com/final-url/",
      };
      store.state.source.data["/"] = redirection;

      expect(window.replaceLocation).toHaveBeenCalledWith(
        "https://external.com/final-url/"
      );
    });
  });

  describe("beforeSSR", () => {
    it("should warn if autoFetch is enabled but there is no source pkg", () => {
      const ctx = {} as Context;
      get.mockReturnValue({});
      const frontityWarn = jest.spyOn(frontityError, "warn");
      const store = createStore(config);
      store.actions.source = undefined;
      store.actions.router.beforeSSR({ ctx });

      expect(frontityWarn).toHaveBeenCalledTimes(1);
      expect(frontityWarn).toHaveBeenCalledWith(
        "You are trying to use autoFetch but no source package is installed."
      );
    });

    it("should fetch if autoFetch is enabled", () => {
      const ctx = {} as Context;
      get.mockReturnValue({});
      const store = createStore(config);
      store.libraries.source = undefined;
      store.actions.router.init();
      store.actions.router.beforeSSR({ ctx });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/initial/link/");
    });

    it("should change the context status if there is an error", async () => {
      const ctx = {} as Context;
      get.mockReturnValue({ isError: true, errorStatus: 123 });

      const store = createStore(config);
      await store.actions.router.beforeSSR({ ctx });

      expect(ctx.status).toBe(123);
    });

    it("should change the context status if there is an internal redirection", async () => {
      const ctx: Partial<Context> = {
        URL: new URL("https://localhost/"),
        redirect: jest.fn(),
      };
      get.mockReturnValue({
        isReady: true,
        isRedirection: true,
        redirectionStatus: 123,
        isExternal: false,
        location: "https://backend.com/final-url/#hash?query=value",
      });
      const store = createStore(config);
      store.state.frontity.url = "https://domain.com";

      await store.actions.router.beforeSSR({ ctx: ctx as Context });

      expect(ctx.redirect).toHaveBeenCalledWith(
        "https://domain.com/final-url/#hash?query=value"
      );
      expect(ctx.status).toBe(123);
    });

    it("should change the context status if there is an external redirection", async () => {
      const ctx: Partial<Context> = {
        URL: new URL("https://localhost/"),
        redirect: jest.fn(),
      };
      get.mockReturnValue({
        isReady: true,
        isRedirection: true,
        redirectionStatus: 123,
        isExternal: true,
        location: "https://external.com/final-url/#hash?query=value",
      });
      const store = createStore(config);

      await store.actions.router.beforeSSR({ ctx: ctx as Context });

      expect(ctx.redirect).toHaveBeenCalledWith(
        "https://external.com/final-url/#hash?query=value"
      );
      expect(ctx.status).toBe(123);
    });
  });
});
