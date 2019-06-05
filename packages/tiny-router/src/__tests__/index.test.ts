import { createStore, observe } from "frontity";
import { init, set } from "../actions";
import tinyRouter from "..";
import TinyRouter from "../..";

let config: TinyRouter;
let normalize: jest.Mock;

beforeEach(() => {
  normalize = jest.fn();

  config = {
    name: "@frontity/tiny-router",
    state: {
      frontity: {
        platform: "server",
        initialLink: "/initial/link/"
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
        normalize
      }
    }
  };
});

describe("actions", () => {
  test("set() should work just with links", () => {
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

  test("init() should populate the initial link", () => {
    const store = createStore(config);

    normalize.mockReturnValue("/initial/link/");

    store.actions.router.init();

    // check that first state is correct
    expect(normalize).toHaveBeenCalledTimes(1);
    expect(normalize).toHaveBeenCalledWith("/initial/link/");
    expect(store.state.router.link).toBe("/initial/link/");
  });

  test("init() should add event listener to handle popstate events", () => {
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
        state: { link: "/tag/japan/page/3/" }
      })
    );

    expect(currentLink).toBe("/tag/japan/page/3/");
    expect(store.state.router.link).toBe("/tag/japan/page/3/");
  });
});
