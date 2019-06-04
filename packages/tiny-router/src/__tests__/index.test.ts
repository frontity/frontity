import { createStore, observe } from "frontity";
import { init, set } from "../actions";
import tinyRouter from "..";
import TinyRouter from "../..";

let config: TinyRouter;
let getParams: jest.Mock;
let getRoute: jest.Mock;

beforeEach(() => {
  getParams = jest.fn();
  getRoute = jest.fn();

  config = {
    name: "@frontity/tiny-router",
    state: {
      frontity: {
        platform: "server"
      },
      router: { ...tinyRouter.state.router }
    },
    actions: {
      router: {
        init,
        set
      }
    },
    libraries: {
      source: {
        getParams,
        getRoute
      }
    }
  };
});

describe("actions", () => {
  test("set() should work just with a route passed as string", () => {
    const store = createStore(config);

    const routeOrParams = "/some-post/";

    const route = "/some-post/";
    const params = { path: "/some-post/", page: 1, query: {} };

    getRoute.mockReturnValue(route);
    getParams.mockReturnValue(params);

    store.actions.router.set(routeOrParams);
    expect(getRoute).toHaveBeenCalledWith(routeOrParams);
    expect(getParams).toHaveBeenCalledWith(routeOrParams);
    expect(store.state.router).toMatchObject(params);
  });

  test("set() should work with route passed as params", () => {
    const store = createStore(config);

    const routeOrParams = {
      path: "/category/some-category/",
      page: 2,
      query: { s: "nature" }
    };

    const route = "/category/some-category/page/2/?s=nature";
    const params = {
      path: "/category/some-category/",
      page: 2,
      query: { s: "nature" }
    };

    getRoute.mockReturnValue(route);
    getParams.mockReturnValue(params);

    store.actions.router.set(routeOrParams);
    expect(getRoute).toHaveBeenCalledWith(routeOrParams);
    expect(getParams).toHaveBeenCalledWith(routeOrParams);
    expect(store.state.router).toMatchObject(params);
  });

  test("init() should add event listener to handle popstate events", () => {
    config.state.frontity.platform = "client";
    const store = createStore(config);
    store.actions.router.init();

    getRoute.mockReturnValueOnce("/tag/japan/page/3/");
    getParams.mockReturnValueOnce({ path: "/tag/japan/", page: 3, query: {} });

    // check that first state is correct
    expect(window.history.state).toMatchObject({
      page: 1,
      path: "/"
    });

    // check reactions to "popstate" events
    let currentPath = store.state.router.path;
    observe(() => {
      currentPath = store.state.router.path;
    });

    window.dispatchEvent(
      new PopStateEvent("popstate", {
        state: {
          path: "/tag/japan",
          page: 3
        }
      })
    );

    expect(currentPath).toBe("/tag/japan/");
    expect(store.state.router.path).toBe("/tag/japan/");
    expect(store.state.router.page).toBe(3);
  });
});
