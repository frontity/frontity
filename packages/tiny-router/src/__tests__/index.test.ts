import * as frontity from "frontity";
import { Context } from "frontity/types";
import tinyRouter from "..";
import TinyRouter from "../../types";
import { SetOptions } from "@frontity/router/types";

let config: TinyRouter;
let normalize: jest.Mock;
let fetch: jest.Mock;
let get: jest.Mock;

const createStore = frontity.createStore;

const spiedPushState = jest.spyOn(window.history, "pushState");
const spiedReplaceState = jest.spyOn(window.history, "replaceState");

beforeEach(() => {
  normalize = jest.fn();
  fetch = jest.fn();
  get = jest.fn();

  config = {
    name: "@frontity/tiny-router",
    state: {
      frontity: {
        platform: "client",
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

afterEach(() => {
  spiedPushState.mockClear();
  spiedReplaceState.mockClear();
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
      expect(spiedPushState).toHaveBeenCalledTimes(1);
    });

    test("should work with full URLs", () => {
      const store = createStore(config);

      const link = "https://blog.example/some-post/page/3/?some=query";
      const normalized = "/some-post/page/3/?some=query";

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link);
      expect(normalize).toHaveBeenCalledWith(link);
      expect(store.state.router.link).toBe(normalized);
      expect(spiedPushState).toHaveBeenCalledTimes(1);
    });

    test("should not create new history entry if link is the same", () => {
      const store = createStore(config);

      const link = "/some-post/";
      const normalized = "/some-post/";

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link);
      expect(spiedPushState).toHaveBeenCalledTimes(1);

      store.actions.router.set(link);
      expect(spiedPushState).toHaveBeenCalledTimes(1);
    });

    test("should populate latest link and state", () => {
      const store = createStore(config);

      const link = "/some-post/";
      const normalized = "/some-post/";
      const options: SetOptions = {
        method: "replace",
        state: {
          initial: 1,
          pages: [1, 2, 3],
        },
      };

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link, options);
      expect(store.state.router.link).toBe(normalized);
      expect(store.state.router.state).toEqual(options.state);
    });

    test("should populate previous link if current link and next link are different", () => {
      const store = createStore(config);

      const current = "/";
      const next = "/page/2/";

      store.state.router.link = current;

      normalize.mockReturnValue(next);

      store.actions.router.set(next);
      expect(store.state.router.link).toBe(next);
      expect(store.state.router.previous).toBe(current);
    });

    test("should not populate previous link if current link and next link are the same", () => {
      const store = createStore(config);

      const current = "/page/2/";
      const next = "/page/2/";

      store.state.router.link = current;

      normalize.mockReturnValue(next);

      store.actions.router.set(next);
      expect(store.state.router.link).toBe(next);
      expect(store.state.router.previous).toBeUndefined();
    });

    test("should follow the `options.method` value if present", () => {
      const store = createStore(config);

      const link = "/some-post/";
      const options: SetOptions = {
        method: "push",
      };
      normalize.mockReturnValue(link);

      store.actions.router.set(link, options);
      expect(spiedPushState).toHaveBeenCalledTimes(1);

      const link2 = "/other-post/";
      options.method = "replace";
      normalize.mockReturnValue(link2);

      store.actions.router.set(link2, options);
      expect(spiedReplaceState).toHaveBeenCalledTimes(1);
    });

    test("should store the state in `window.history`", () => {
      const store = createStore(config);

      const link = "/some-post/";
      const normalized = "/some-post/";
      const options: SetOptions = {
        method: "push",
        state: {
          initial: 1,
          pages: [1, 2, 3],
        },
      };

      normalize.mockReturnValue(normalized);

      store.actions.router.set(link, options);
      expect(window.history.state).toEqual(options.state);

      options.method = "replace";

      store.actions.router.set(link, options);
      expect(window.history.state).toEqual(options.state);
    });

    test("should fetch if `autoFetch` is enabled", () => {
      const store = createStore(config);

      let link = "/first-link/";
      normalize.mockReturnValue(link);

      store.actions.router.set(link, { method: "push" });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenLastCalledWith(link);

      link = "/second-link/";
      normalize.mockReturnValue(link);

      store.actions.router.set(link, { method: "replace" });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenLastCalledWith(link);
    });
  });

  describe("updateState", () => {
    test("should replace the current browser state with the new state", () => {
      const store = createStore(config);
      const currentState = {
        links: ["/"],
      };

      const link = store.state.router.link;
      store.state.router.state = currentState;

      const nextState = {
        links: ["/", "/page/2/"],
      };

      expect(store.state.router.link).toBe(link);
      expect(store.state.router.state).toEqual(currentState);

      store.actions.router.updateState(nextState);

      expect(store.state.router.link).toBe(link);
      expect(store.state.router.state).toEqual(nextState);
      expect(spiedReplaceState).toHaveBeenCalledTimes(1);
      expect(spiedReplaceState).toHaveBeenCalledWith(nextState, "", link);
    });
  });

  describe("init", () => {
    test("should populate the initial link", () => {
      const store = createStore(config);
      store.state.frontity.platform = "server";

      normalize.mockReturnValue("/initial/link/");

      store.actions.router.init();

      // check that first state is correct
      expect(normalize).toHaveBeenCalledTimes(1);
      expect(normalize).toHaveBeenCalledWith("/initial/link/");
      expect(store.state.router.link).toBe("/initial/link/");
    });

    test("should fire `replaceState` once and add an event listener to handle popstate events", () => {
      const store = createStore(config);
      store.state.router.state = { some: "state" };
      store.actions.router.init();

      // checks that `replaceState` was fired.
      expect(window.history.state).toEqual(store.state.router.state);

      const pathname = "/about-us/";
      const search = "?id=3&search=value";
      const hash = "#element";
      const link = pathname + search + hash;

      Object.defineProperty(window, "location", {
        value: { pathname, search, hash },
      });

      normalize.mockReturnValueOnce(link);

      // checks that there is an event listener handleling `popstate`.
      window.dispatchEvent(
        new PopStateEvent("popstate", { state: { some: "different state" } })
      );

      expect(store.state.router.link).toBe(link);
      expect(store.state.router.state).toEqual({ some: "different state" });
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

    test("should fetch if autoFetch is enabled", () => {
      const ctx = {} as Context;
      get.mockReturnValue({});

      const store = createStore(config);
      store.state.frontity.platform = "server";
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
