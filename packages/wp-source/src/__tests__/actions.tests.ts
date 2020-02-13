import { createStore, observe, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../";
import WpSource, { Pattern, Handler } from "../../types";
import * as handlers from "../libraries/handlers";

// Create mock for handler generators
jest.mock("../libraries/handlers");

const handlerMocks = handlers as jest.Mocked<typeof handlers>;
handlerMocks.taxonomyHandler.mockReturnValue(jest.fn());
handlerMocks.postTypeHandler.mockReturnValue(jest.fn());
handlerMocks.postTypeArchiveHandler.mockReturnValue(jest.fn());

let handler: jest.Mocked<Pattern<Handler>>;
let store: InitializedStore<WpSource>;

beforeEach(() => {
  // Reset mocks
  handlerMocks.taxonomyHandler.mockClear();
  handlerMocks.postTypeHandler.mockClear();
  handlerMocks.postTypeArchiveHandler.mockClear();
  // Create a mock handler
  handler = {
    name: "always",
    priority: 0,
    pattern: "/(.*)",
    func: jest.fn(async ({ route, state }) => {
      await Promise.resolve();
      Object.assign(state.source.data[route], {
        type: "example",
        id: 1,
        isPostType: true,
        isFetching: true,
        isReady: false
      });
    })
  };

  // Initialize the store
  store = createStore(clone(wpSource()));
  store.state.source.api = "https://test.frontity.io/wp-json";

  // Add mock handler to the store
  store.libraries.source.handlers.push(handler);
});

describe("fetch", () => {
  test("should work if data doesn't exist", async () => {
    await store.actions.source.fetch("/some/route/");
    expect(handler.func).toHaveBeenCalledTimes(1);
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("does nothing if data exists", async () => {
    store.state.source.data["/some/route/"] = {
      type: "example",
      id: 1,
      isPostType: true,
      isFetching: false,
      isReady: true
    };

    await store.actions.source.fetch("/some/route/");
    expect(handler.func).not.toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should run again when `force` is used", async () => {
    store.state.source.data["/some/route/"] = {
      errorStatusText: "Request Timeout",
      errorStatus: 408,
      isError: true,
      isFetching: false,
      isReady: true
    };

    await store.actions.source.fetch({ link: "/some/route/", force: true });
    expect(handler.func).toHaveBeenCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("Throw an error if fetch fails", async () => {
    handler.func = jest.fn(async params => {
      throw new Error("Some error");
    });

    try {
      await store.actions.source.fetch("/some/route/");
      throw new Error("This should not be reached");
    } catch (e) {
      expect(e.message).toBe("Some error");
    }
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("should allow to observe 'isReady' properly", done => {
    expect(store.state.source.get("/").isReady).toBe(false);
    observe(() => {
      if (store.state.source.get("/").isReady) done();
    });
    store.actions.source.fetch("/");
  });

  test("should allow to observe 'isFetching' properly", done => {
    expect(store.state.source.get("/").isFetching).toBe(false);
    store.actions.source.fetch("/");
    expect(store.state.source.get("/").isFetching).toBe(true);
    observe(() => {
      const { isFetching } = store.state.source.get("/");
      if (!isFetching) done();
    });
  });
});

describe("init", () => {
  test("should add redirect for the specified homepage", async () => {
    store.state.source.homepage = "/about-us/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for the specified posts page", async () => {
    store.state.source.postsPage = "/all-posts/";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for categories if 'categoryBase' is set", async () => {
    store.state.source.categoryBase = "wp-cat";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect for tags if 'tagBase' is set", async () => {
    store.state.source.tagBase = "wp-tag";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add redirect if 'subirectory' is present", async () => {
    store.state.source.homepage = "/about-us/";
    store.state.source.postsPage = "/all-posts/";
    store.state.source.categoryBase = "wp-cat";
    store.state.source.tagBase = "wp-tag";
    store.state.source.subdirectory = "blog";
    await store.actions.source.init();
    expect(store.libraries.source.redirections).toMatchSnapshot();
  });

  test("should add new handlers from postTypes array", async () => {
    store.state.source.postTypes.push(
      {
        type: "cpt1",
        endpoint: "cpts1"
      },
      {
        type: "cpt2",
        endpoint: "cpts2",
        archive: "cpt2-archive"
      }
    );

    await store.actions.source.init();

    expect(store.libraries.source.handlers).toMatchSnapshot();
    expect(handlerMocks.postTypeHandler.mock.calls).toMatchSnapshot();
    expect(handlerMocks.postTypeArchiveHandler.mock.calls).toMatchSnapshot();
  });

  test("should add new handlers from taxonomies array", async () => {
    store.state.source.taxonomies.push(
      {
        taxonomy: "taxonomy1",
        endpoint: "taxonomies1"
      },
      {
        taxonomy: "taxonomy2",
        endpoint: "taxonomies2",
        postTypeEndpoint: "cpt"
      },
      {
        taxonomy: "taxonomy3",
        endpoint: "taxonomies3",
        postTypeEndpoint: "multiple-post-type",
        params: {
          type: ["posts", "cpts"]
        }
      }
    );

    await store.actions.source.init();

    expect(store.libraries.source.handlers).toMatchSnapshot();
    expect(handlerMocks.taxonomyHandler.mock.calls).toMatchSnapshot();
  });
});
