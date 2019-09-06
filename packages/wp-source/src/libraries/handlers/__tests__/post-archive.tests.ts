import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import posts from "./mocks/post-archive/posts.json";
import posts2 from "./mocks/post-archive/posts-page-2.json";
import postsCpt from "./mocks/post-archive/posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(wpSource());
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("post archive", () => {
  test("works with first page", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(posts, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2"
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
        "X-WP-TotalPages": "2"
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
        "X-WP-TotalPages": "2"
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });
});
