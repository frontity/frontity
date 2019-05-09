import { createStore, observe } from "@frontity/connect";
import { init, set } from "../actions";
import tinyRouter from "..";

let store;
beforeEach(() => {
  const config = {
    name: "@frontity/tiny-router",
    state: {
      router: { ...tinyRouter.state.router },
      frontity: {
        url: "https://test.frontity.io"
      }
    },
    actions: {
      router: {
        init,
        set
      }
    }
  };
  store = createStore(config);
});

describe("state", () => {
  test("url without page should work", () => {
    store.actions.router.set("/some-post/");
    expect(store.state.router.url).toBe("https://test.frontity.io/some-post/");
  });

  test("url with page = 1 should work", () => {
    store.actions.router.set({ path: "/category/nature/", page: 1 });
    expect(store.state.router.url).toBe(
      "https://test.frontity.io/category/nature/"
    );
  });

  test("url with page > 1 should work", () => {
    store.actions.router.set({ path: "/category/nature/", page: 2 });
    expect(store.state.router.url).toBe(
      "https://test.frontity.io/category/nature/page/2/"
    );
  });
});

describe("actions", () => {
  test("set() should work just with a path", () => {
    store.actions.router.set("/some-post/");
    expect(store.state.router).toMatchObject({
      "page": null,
      "path": "/some-post/",
    });
  });

  test("set() should work with path and page", () => {
    store.actions.router.set({ path: "/category/some-category/", page: 2 });
    expect(store.state.router).toMatchObject({
      "page": 2,
      "path": "/category/some-category/",
    });
  });

  test("init() should add event listener to handle popstate events", () => {
    store.actions.router.init();

    // check that first state is correct
    expect(window.history.state).toMatchObject({
      "page": null,
      "path": "/",
    });

    // check reactions to "popstate" events
    let currentPath = store.state.router.path
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

    expect(currentPath).toBe("/tag/japan");
    expect(store.state.router.path).toBe("/tag/japan");
    expect(store.state.router.page).toBe(3);
  });
});
