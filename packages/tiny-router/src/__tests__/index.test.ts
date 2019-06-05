import { createStore, observe } from "frontity";
import { init, set } from "../actions";
import tinyRouter from "..";
import TinyRouter from "../..";

let config: TinyRouter;
let stringify: jest.Mock;

beforeEach(() => {
  stringify = jest.fn();

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
        stringify
      }
    }
  };
});

describe("actions", () => {
  test("set() should work just with links", () => {
    const store = createStore(config);

    const link = "/some-post/";
    const stringified = "/some-post/";

    stringify.mockReturnValue(stringified);

    store.actions.router.set(link);
    expect(stringify).toHaveBeenCalledWith(link);
    expect(store.state.router.link).toBe(stringified);
  });

  test("set() should work with full URLs", () => {
    const store = createStore(config);

    const link = "https://blog.example/some-post/page/3/?some=query";
    const stringified = "/some-post/page/3/?some=query";

    stringify.mockReturnValue(stringified);

    store.actions.router.set(link);
    expect(stringify).toHaveBeenCalledWith(link);
    expect(store.state.router.link).toBe(stringified);
  });

  test("init() should add event listener to handle popstate events", () => {
    config.state.frontity.platform = "client";
    const store = createStore(config);
    store.actions.router.init();

    stringify.mockReturnValueOnce("/tag/japan/page/3/");

    // check that first state is correct
    expect(window.history.state).toMatchObject({
      link: "/"
    });

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
