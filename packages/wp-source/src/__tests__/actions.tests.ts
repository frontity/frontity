import { createStore } from "@frontity/connect";
import wpSource from "../";
import actions from "../actions";

jest.mock("../");

let handler: jest.Mock;
const initStore = (data = {}) => {
  handler = jest.fn(async (source, { route }) => {
    await (source.data[route] = {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: true
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

  test("return 404 is fetch fails", async () => {
    const store = initStore();
    handler.mockRejectedValue("Some error");
    await store.actions.source.fetch("/some/route/");
    expect(store.state.source.data).toMatchSnapshot();
  });
});
