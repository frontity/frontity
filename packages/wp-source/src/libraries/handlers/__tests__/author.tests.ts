import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import author1 from "./mocks/author/author-1.json";
import author1Posts from "./mocks/author/author-1-posts.json";
import author1PostsPage2 from "./mocks/author/author-1-posts-page-2.json";
import author1PostsCpt from "./mocks/author/author-1-posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(wpSource());
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("author", () => {
  test("doesn't exist in source.author", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([author1]))
      .mockResolvedValueOnce(
        mockResponse(author1Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      );
    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/");
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });

  test("exists in source.author but not in source.data", async () => {
    // Add author to the store
    store.state.source.author[1] = author1;
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(author1PostsPage2, {
        "X-WP-Total": "5",
        "X-WP-TotalPages": "2"
      })
    );
    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/page/2/");
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };

    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([author1]))
      .mockResolvedValueOnce(
        mockResponse(author1PostsCpt, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      );
    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
    expect((store.state.source as any).cpt).toMatchSnapshot();
  });

  test("returns 404 if author doesn't exist in WP", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValue(mockResponse([]));

    // Fetch Author page
    await store.actions.source.fetch("/author/non-existent/");
    expect(api.get).toBeCalledTimes(1);
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });

  test("returns 404 if the page fetched is out of range", async () => {
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([author1]))
      .mockResolvedValueOnce(mockResponse([]));

    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/page/3");
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([author1]))
      .mockResolvedValueOnce(
        mockResponse([], {
          "X-WP-Total": "0",
          "X-WP-TotalPages": "0"
        })
      );
    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/");
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });

  test("doesn't return 404 if the first page is empty (no headers)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([author1]))
      .mockResolvedValueOnce(mockResponse([], {}));
    // Fetch Author page
    await store.actions.source.fetch("/author/author-1/");
    expect(store.state.source.data).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.post).toMatchSnapshot();
  });
});
