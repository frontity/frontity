import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import date2019Posts from "./mocks/date/2019-posts.json";
import date2019PostsPage2 from "./mocks/date/2019-posts-page-2.json";
import date201901Posts from "./mocks/date/2019-01-posts.json";
import date20190101Posts from "./mocks/date/2019-01-01-posts.json";
import date20190101PostsCpt from "./mocks/date/2019-01-01-posts-cpt.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore<WpSource>(clone(wpSource()));
  store.state.source.url = "https://test.frontity.org";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("date", () => {
  test("get two pages of year 2019", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(date2019Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      )
      .mockResolvedValueOnce(
        mockResponse(date2019PostsPage2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/2019/");
    await store.actions.source.fetch("/2019/page/2/");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("get two pages of year 2019 (with query params)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(date2019Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      )
      .mockResolvedValueOnce(
        mockResponse(date2019PostsPage2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "2",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/2019/?some=param");
    await store.actions.source.fetch("/2019/page/2/?some=param");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("get two pages of year 2019 (with search)", async () => {
    // Mock Api responses
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(date2019Posts, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      )
      .mockResolvedValueOnce(
        mockResponse(date2019PostsPage2, {
          "X-WP-Total": "5",
          "X-WP-TotalPages": "3",
        })
      );
    // Fetch entities
    await store.actions.source.fetch("/2019/?s=some+search");
    await store.actions.source.fetch("/2019/page/2/?s=some+search");
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source).toMatchSnapshot();
  });

  test("get January, 2019", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(
      mockResponse(date201901Posts, {
        "X-WP-Total": "2",
        "X-WP-TotalPages": "1",
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
      mockResponse(date20190101Posts, {
        "X-WP-Total": "1",
        "X-WP-TotalPages": "1",
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
      mockResponse(date20190101PostsCpt, {
        "X-WP-Total": "2",
        "X-WP-TotalPages": "1",
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

  test("overwrites the data when fetched with { force: true }", async () => {
    api.get = jest
      .fn()
      .mockResolvedValueOnce(
        mockResponse(date2019Posts, {
          "X-WP-Total": "3",
          "X-WP-TotalPages": "1",
        })
      )
      .mockResolvedValueOnce(
        mockResponse(date2019PostsPage2, {
          "X-WP-Total": "3",
          "X-WP-TotalPages": "1",
        })
      );

    // Fetch the data for the first page
    await store.actions.source.fetch("/2019/");

    // Fetch the data again (this time returning `date2019PostsPage2`)
    await store.actions.source.fetch("/2019/", {
      force: true,
    });

    // Make sure that api.get() was called for each `source.fetch()`
    expect(api.get).toHaveBeenCalledTimes(2);

    expect(store.state.source).toMatchSnapshot();
  });

  test("An invalid month of the year should return a 404", async () => {
    await store.actions.source.fetch("/2020/99/");

    expect(store.state.source).toMatchSnapshot();
  });

  test("An invalid day of the month should return a 404", async () => {
    await store.actions.source.fetch("/2020/12/77");

    expect(store.state.source).toMatchSnapshot();
  });

  test("An invalid day AND month should return a 404", async () => {
    await store.actions.source.fetch("/2020/999/999");

    expect(store.state.source).toMatchSnapshot();
  });
});
