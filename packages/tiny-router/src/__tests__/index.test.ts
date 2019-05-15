import { createStore, observe } from "frontity";
import { init, set } from "../actions";
import tinyRouter from "..";
import TinyRouter from "../..";

let config: TinyRouter;

beforeEach(() => {
  config = {
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
});

describe("state", () => {
  test("location without page should work", () => {
    const store = createStore(config);
    store.actions.router.set("/some-post/");
    expect(store.state.router.location.href).toBe(
      "https://test.frontity.io/some-post/"
    );
  });

  test("location with page = 1 should work", () => {
    const store = createStore(config);
    store.actions.router.set({ path: "/category/nature/", page: 1 });
    expect(store.state.router.location.href).toBe(
      "https://test.frontity.io/category/nature/"
    );
  });

  test("location with page > 1 should work", () => {
    const store = createStore(config);
    store.actions.router.set({ path: "/category/nature/", page: 2 });
    expect(store.state.router.location.href).toBe(
      "https://test.frontity.io/category/nature/page/2/"
    );
  });
});

describe("actions", () => {
  test("set() should work just with a path", () => {
    const store = createStore(config);
    store.actions.router.set("/some-post/");
    expect(store.state.router).toMatchObject({
      page: 1,
      path: "/some-post/"
    });
  });

  test("set() should work with path and page", () => {
    const store = createStore(config);
    store.actions.router.set({ path: "/category/some-category/", page: 2 });
    expect(store.state.router).toMatchObject({
      page: 2,
      path: "/category/some-category/"
    });
  });

  test("set() should work with a full url", () => {
    const store = createStore(config);
    store.actions.router.set(
      "https://frontity.org/category/some-category/page/3"
    );
    expect(store.state.router).toMatchObject({
      page: 3,
      path: "/category/some-category/"
    });
  });

  test("set() should work with a path with page", () => {
    const store = createStore(config);
    store.actions.router.set("/category/some-category/page/4");
    expect(store.state.router).toMatchObject({
      page: 4,
      path: "/category/some-category/"
    });
  });

  test("set() should work with a path of only page", () => {
    const store = createStore(config);
    store.actions.router.set("/page/2");
    expect(store.state.router).toMatchObject({
      page: 2,
      path: "/"
    });
  });

  test("set() should work with a url of only page", () => {
    const store = createStore(config);
    store.actions.router.set("https://frontity.org/page/3");
    expect(store.state.router).toMatchObject({
      page: 3,
      path: "/"
    });
  });

  test("set() should work with a path that contains `page` on it", () => {
    const store = createStore(config);
    store.actions.router.set("/this-path-contains-page/");
    expect(store.state.router).toMatchObject({
      page: 1,
      path: "/this-path-contains-page/"
    });
  });

  test("init() should add event listener to handle popstate events", () => {
    const store = createStore(config);
    store.actions.router.init();

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

    expect(currentPath).toBe("/tag/japan");
    expect(store.state.router.path).toBe("/tag/japan");
    expect(store.state.router.page).toBe(3);
  });
});
