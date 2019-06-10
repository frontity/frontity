import { createStore, observe } from "@frontity/connect";
import wpSource from "../";
import actions from "../actions";

jest.mock("../");

let handler: jest.Mock;
const initStore = (data = {}) => {
  handler = jest.fn(async ({ route, state }) => {
    await Promise.resolve();
    Object.assign(source.data[route], {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: true,
      isReady: false
    });
  });
  const config = wpSource();
  // replace data by the one passed as argument
  config.state.source.data = data;
  // replace the mocked fetch by the real one we want to test
  config.actions.source.fetch = actions.fetch;
  // modify "resolver.match" implementation
  config.libraries.source.resolver.match = jest
    .fn()
    .mockReturnValue({ handler, params: {} });
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
    const store = initStore({
      "/some/route/": {
        type: "example",
        id: 1,
        isPostType: true,
        isFetching: false,
        isReady: true
      }
    });
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
