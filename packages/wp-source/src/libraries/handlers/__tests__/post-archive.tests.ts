import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import posts from "./mocks/post-archive/posts.json";
import posts2 from "./mocks/post-archive/posts-page-2.json";
import postsCpt from "./mocks/post-archive/posts-cpt.json";
import { Package } from "frontity/types";

let store: InitializedStore<WpSource & Package>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSource & Package>(clone(wpSource()));

  // We need to set it because state.source.url derives state from state.frontity.url
  store.state.frontity = { url: "http://frontity.local" };

  store.state.source.api = "https://test.frontity.org/wp-json";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("post archive", () => {
  test("works with first page", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with pagination", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/page/2/");
    expect(store.state.source).toMatchSnapshot();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // Add custom post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(postsCpt, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with query params and pagination", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/page/2/?some=param");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with search", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });

  test("works with search and pagination", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2",
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/page/2/?s=some+search");
    expect(store.state.source).toMatchSnapshot();
  });

  test("overwrites the data when fetched with { force: true }", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      )
      .mockResolvedValueOnce(
        mockResponse(posts2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );

    // Fetch entities
    await store.actions.source.fetch("/");

    await store.actions.source.fetch("/", { force: true });

    expect(store.state.source).toMatchSnapshot();
  });
});
