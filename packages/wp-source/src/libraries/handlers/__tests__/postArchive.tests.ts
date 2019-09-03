import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../postArchive";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/posts.json";
import posts2 from "./mocks/posts-page-2.json";

import wpSource from "../../../";
jest.mock("../../../");

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // First, get a mocked instance of wpSource
  const config = wpSource();

  // Then, replaces the mocked implementation of Api
  const { api } = config.libraries.source;
  api.get = jest.fn().mockResolvedValue(
    mockResponse(posts, {
      "X-WP-Total": 65,
      "X-WP-TotalPages": 7
    })
  );

  // And add the original implementation of populate
  config.libraries.source.populate = jest.fn().mockImplementation(populate);

  // Instantiate the store
  store = createStore(config);
});

describe("post archive", () => {
  test("works with first page", async () => {
    // source.fetch("/")
    store.state.source.data["/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/",
      params: {},
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("works with pagination", async () => {
    // source.fetch("/page/2/")
    store.state.source.data["/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    const { api } = store.libraries.source;
    api.get = jest.fn().mockResolvedValue(
      mockResponse(posts2, {
        "X-WP-Total": 65,
        "X-WP-TotalPages": 7
      })
    );

    await handler({
      route: "/page/2/",
      params: {},
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };
    // source.fetch("/")
    store.state.source.data["/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/",
      params: {},
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });
});
