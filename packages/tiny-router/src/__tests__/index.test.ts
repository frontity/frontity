import { createStore } from "@frontity/connect";
import { init, set } from "../actions";
import tinyRouter from "..";

const config = {
  name: "@frontity/tiny-router",
  state: {
    router: tinyRouter.state.router,
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

let store: any;
beforeEach(() => {
  store = createStore(config);
});

describe("state", () => {
  test("url without page should work", () => {
    store.actions.router.set("/some-post");
    expect(store.state.router.url).toBe("https://test.frontity.io/some-post");
  });
  test("url with page = 1 should work", () => {
    store.actions.router.set({ path: "/category/nature", page: 1 });
    expect(store.state.router.url).toBe(
      "https://test.frontity.io/category/nature"
    );
  });
  test("url with page > 1 should work", () => {
    store.actions.router.set({ path: "/category/nature", page: 2 });
    expect(store.state.router.url).toBe(
      "https://test.frontity.io/category/nature/page/2"
    );
  });
});

describe("actions", () => {
  test("set() should work just with a path", () => {
    store.actions.router.set("/some-post");
    const snapshot = store.getSnapshot();
    expect(snapshot).toMatchSnapshot();
  });
  test("set() should work with path and page", () => {
    store.actions.router.set({ path: "/category/some-category", page: 2 });
    const snapshot = store.getSnapshot();
    expect(snapshot).toMatchSnapshot();
  });
  test.todo("init() should add event listener to handle popstate events");
});
