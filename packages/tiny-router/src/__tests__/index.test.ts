import * as frontity from "frontity";
import { Context } from "frontity/types";
import tinyRouter from "..";
import TinyRouter from "../../types";

let config: TinyRouter;
let normalize: jest.Mock;
let fetch: jest.Mock;
let get: jest.Mock;

const createStore = frontity.createStore;
const observe = frontity.observe;

beforeEach(() => {
  normalize = jest.fn();
  fetch = jest.fn();
  get = jest.fn();

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

describe("actions", () => {
  describe("set", () => {
    test("should work just with links", () => {
      const store = createStore(config);

      const link = "/some-post/";
      const normalized = "/some-post/";

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link);
      expect(normalize).toHaveBeenCalledWith(link);
      expect(store.state.router.link).toBe(normalized);
    });

    test("set() should work with full URLs", () => {
      const store = createStore(config);

      const link = "https://blog.example/some-post/page/3/?some=query";
      const normalized = "/some-post/page/3/?some=query";

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link);
      expect(normalize).toHaveBeenCalledWith(link);
      expect(store.state.router.link).toBe(normalized);
    });
  });

  describe("init", () => {
    test("should populate the initial link", () => {
      const store = createStore(config);

      normalize.mockReturnValue("/initial/link/");

      store.actions.router.init();

      // check that first state is correct
      expect(normalize).toHaveBeenCalledTimes(1);
      expect(normalize).toHaveBeenCalledWith("/initial/link/");
      expect(store.state.router.link).toBe("/initial/link/");
    });

    test("should add event listener to handle popstate events", () => {
      config.state.frontity.platform = "client";
      const store = createStore(config);
      store.actions.router.init();

      normalize.mockReturnValueOnce("/tag/japan/page/3/");

      // check that first state is correct
      expect(window.history.state).toMatchObject({ link: "/" });

      // check reactions to "popstate" events
      let currentLink = store.state.router.link;
      observe(() => {
        currentLink = store.state.router.link;
      });

      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: { link: "/tag/japan/page/3/" },
        })
      );

      expect(currentLink).toBe("/tag/japan/page/3/");
      expect(store.state.router.link).toBe("/tag/japan/page/3/");
    });
  });

  describe("beforeSSR", () => {
    test("should warn if autoFetch is enabled but there is no source pkg", () => {
      const ctx = {} as Context;
      get.mockReturnValue({});
      Object.defineProperty(frontity, "warn", {
        value: jest.fn(),
      });
      const store = createStore(config);
      store.actions.source = undefined;
      store.actions.router.beforeSSR({ ctx });

      expect(frontity.warn).toHaveBeenCalledTimes(1);
      expect(frontity.warn).toHaveBeenCalledWith(
        "You are trying to use autoFetch but no source package is installed."
      );
    });

    test("should fetch is autoFetch is enabled", () => {
      const ctx = {} as Context;
      get.mockReturnValue({});
      const store = createStore(config);
      store.libraries.source = undefined;
      store.actions.router.init();
      store.actions.router.beforeSSR({ ctx });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/initial/link/");
    });

    test("should change the context status if there is an error", async () => {
      const ctx = {} as Context;
      get.mockReturnValue({ isError: true, errorStatus: 123 });

      const store = createStore(config);
      await store.actions.router.beforeSSR({ ctx });

      expect(ctx.status).toBe(123);
    });
  });
});
