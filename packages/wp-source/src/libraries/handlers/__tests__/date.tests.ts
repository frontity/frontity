import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import date_2019_posts from "./mocks/date/2019-posts.json";
import date_2019_posts_2 from "./mocks/date/2019-posts-page-2.json";
import date_2019_01_posts from "./mocks/date/2019-01-posts.json";
import date_2019_01_01_posts from "./mocks/date/2019-01-01-posts.json";
import date_2019_01_01_posts_cpt from "./mocks/date/2019-01-01-posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(clone(wpSource()));
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("date", () => {
  test("get two pages of year 2019", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(date_2019_posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      )
      .mockResolvedValueOnce(
        mockResponse(date_2019_posts_2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2"
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/2019/");
    await store.actions.source.fetch("/2019/page/2/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("get January, 2019", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(date_2019_01_posts, {
        "X-WP-Total": "2",
        "X-WP-TotalPages": "1"
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/2019/01/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("get January 1, 2019", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(date_2019_01_01_posts, {
        "X-WP-Total": "1",
        "X-WP-TotalPages": "1"
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/2019/01/01");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // Add custom post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "cpt"] };
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(date_2019_01_01_posts_cpt, {
        "X-WP-Total": "2",
        "X-WP-TotalPages": "1"
      })
    );
    // Fetch entities
    await store.actions.source.fetch("/2019/01/01");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("returns 404 if the page fetched is empty", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    // Fetch entities
    await store.actions.source.fetch("/2020/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });
});
