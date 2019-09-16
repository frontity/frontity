import { createStore, observe } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../";
import actions from "../actions";

let handler: jest.Mock;
const initStore = () => {
  handler = jest.fn(async ({ route, state }) => {
    await Promise.resolve();
    Object.assign(state.source.data[route], {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: true,
      isReady: false
    });
  });

  const config = clone(wpSource());

  // add a handler for tests
  config.libraries.source.handlers.push({
    name: "always",
    priority: 0,
    pattern: "/(.*)",
    func: handler
  });

  // replace the mocked fetch by the real one we want to test
  config.actions.source.fetch = actions.fetch;
  // replace the mocked init by the real one we want to test
  config.actions.source.init = actions.init;
  return createStore(config);
};

describe("fetch", () => {
  test("should work if data doesn't exist", async () => {
    const store = initStore();
    await store.actions.source.fetch("/some/route/");
    expect(handler).toBeCalledTimes(1);
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("does nothing if data exists", async () => {
    const store = initStore();
    store.state.source.data["/some/route/"] = {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: false,
      isReady: true
    };

    await store.actions.source.fetch("/some/route/");
    expect(handler).not.toBeCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("returns 404 is fetch fails", async () => {
    const store = initStore();
    handler.mockRejectedValue("Some error");
    await store.actions.source.fetch("/some/route/");
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should allow to observe 'isReady' properly", done => {
    const { state, actions } = initStore();
    expect(state.source.get("/").isReady).toBe(false);
    observe(() => {
      if (state.source.get("/").isReady) done();
    });
    actions.source.fetch("/");
  });

  test("should allow to observe 'isFetching' properly", done => {
    const { state, actions } = initStore();
    expect(state.source.get("/").isFetching).toBe(false);
    actions.source.fetch("/");
    expect(state.source.get("/").isFetching).toBe(true);
    observe(() => {
      const { isFetching } = state.source.get("/");
      if (!isFetching) done();
    });
  });
});

describe("init", () => {
  test("should add redirect for the specified homepage", async () => {
    const store = initStore();
    store.state.source.homepage = "/about-us/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for the specified posts page", async () => {
    const store = initStore();
    store.state.source.postsPage = "/all-posts/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for categories if 'categoryBase' is set", async () => {
    const store = initStore();
    store.state.source.categoryBase = "wp-cat";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for tags if 'tagBase' is set", async () => {
    const store = initStore();
    store.state.source.tagBase = "wp-tag";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect if 'subirectory' is present", async () => {
    const store = initStore();
    store.state.source.homepage = "/about-us/";
    store.state.source.postsPage = "/all-posts/";
    store.state.source.categoryBase = "wp-cat";
    store.state.source.tagBase = "wp-tag";
    store.state.source.subdirectory = "blog";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });
});
