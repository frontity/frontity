import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../tag";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/posts-tag-9.json";

import wpSource from "../../../";
jest.mock("../../../");

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // First, get a mocked instance of wpSource
  const config = wpSource();

  // Then, replaces the mocked implementation of Api
  const { api } = config.libraries.source;
  api.getIdBySlug = jest.fn().mockResolvedValue(9);
  api.get = jest.fn().mockResolvedValue(
    mockResponse(posts, {
      "X-WP-Total": 3,
      "X-WP-TotalPages": 1
    })
  );

  // And add the original implementation of populate
  config.libraries.source.populate = jest.fn().mockImplementation(populate);

  // Instantiate the store
  store = createStore(config);
});

describe("tag", () => {
  test("doesn't exist in source.tag", async () => {
    // source.fetch("/tag/iceland/")
    store.state.source.data["/tag/iceland/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/tag/iceland/",
      params: { slug: "iceland" },
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("exists in source.tag but not in source.data", async () => {
    store.state.source.tag[9] = {
      id: 9,
      count: 3,
      description: "",
      link: "https://test.frontity.io/tag/iceland/",
      name: "Iceland",
      slug: "iceland",
      taxonomy: "tag",
      meta: []
    };

    // source.fetch("/tag/iceland/")
    store.state.source.data["/tag/iceland/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/tag/iceland/",
      params: { slug: "iceland" },
      ...store
    });

    expect(store.libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };
    // source.fetch("/tag/iceland/")
    store.state.source.data["/tag/iceland/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/tag/iceland/",
      params: { slug: "iceland" },
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });
});
