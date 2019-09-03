import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../author";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/posts-author-2.json";

import wpSource from "../../../";
jest.mock("../../../");

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // First, get a mocked instance of wpSource
  const config = wpSource();

  // Then, replaces the mocked implementation of Api
  const { api } = config.libraries.source;
  api.getIdBySlug = jest.fn().mockResolvedValue(2);
  api.get = jest.fn().mockResolvedValue(
    mockResponse(posts, {
      "X-WP-Total": 5,
      "X-WP-TotalPages": 1
    })
  );

  // And add the original implementation of populate
  config.libraries.source.populate = jest.fn().mockImplementation(populate);

  // Instantiate the store
  store = createStore(config);
});

describe("author", () => {
  test("doesn't exist in source.author", async () => {
    // source.fetch("/author/mario")
    store.state.source.data["/author/mario"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/author/mario",
      params: { slug: "mario" },
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("exists in source.author but not in source.data", async () => {
    store.state.source.author[7] = {
      id: 7,
      description: "",
      link: "https://test.frontity.io/author/mario",
      name: "Mario Santos",
      slug: "mario",
      url: "",
      avatar_urls: {
        "24": "",
        "48": "",
        "96": ""
      },
      meta: []
    };

    // source.fetch("/author/mario")
    store.state.source.data["/author/mario"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/author/mario",
      params: { slug: "mario" },
      ...store
    });

    expect(store.libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };
    // source.fetch("/author/mario")
    store.state.source.data["/author/mario"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/author/mario",
      params: { slug: "mario" },
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });
});
