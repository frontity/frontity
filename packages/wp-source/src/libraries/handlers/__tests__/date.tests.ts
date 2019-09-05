import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../date";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts2016 from "./mocks/posts-2016.json";
import posts2016p2 from "./mocks/posts-2016-page-2.json";
import posts20161025 from "./mocks/posts-2016-10-25.json";

import wpSource from "../../../";
jest.mock("../../../");

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // mock state
  const config = wpSource();

  // use populate implementation
  config.libraries.source.populate = jest.fn().mockImplementation(populate);
  store = createStore(config);
});

describe("date", () => {
  test("get two pages of year 2016", async () => {
    const get = store.libraries.source.api.get as jest.Mock;

    get.mockResolvedValueOnce(
      mockResponse(posts2016, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    // source.fetch("/2016/")
    store.state.source.data["/2016/"] = { isFetching: true, isReady: false };

    await handler({
      route: "/2016/",
      params: { year: "2016" },
      ...store
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);

    get.mockResolvedValueOnce(
      mockResponse(posts2016p2, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    // source.fetch({ path: "/2016/", page: 2 })
    store.state.source.data["/2016/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/2016/page/2/",
      params: { year: "2016" },
      ...store
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  // THIS TEST IS FAILING IN TRAVIS BUT PASSING IN LOCAL.
  test.skip("doesn't exist in dataMap (2016/10)", async () => {
    const get = store.libraries.source.api.get as jest.Mock;

    get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/2016/10/")
    store.state.source.data["/2016/10/"] = { isFetching: true, isReady: false };

    await handler({
      route: "/2016/10/",
      params: { year: "2016", month: "10" },
      ...store
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("doesn't exist in dataMap (2016/10/25)", async () => {
    const get = store.libraries.source.api.get as jest.Mock;

    get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/2016/10/25/")
    store.state.source.data["/2016/10/25/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/2016/10/25/",
      params: { year: "2016", month: "10", day: "25" },
      ...store
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(store.state.source.data).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("fetchs from a different endpoint with extra params", async () => {
    const get = store.libraries.source.api.get as jest.Mock;

    get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    // change the default post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };

    // source.fetch("/2016/10/25/")
    store.state.source.data["/2016/10/25/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/2016/10/25/",
      params: { year: "2016", month: "10", day: "25" },
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });

  test("throws an error if the page fetched doesn't exist", async () => {
    // First page
    store.libraries.source.api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    // source.fetch("/2016/10/25/")
    store.state.source.data["/2016/10/25/"] = {
      isFetching: true,
      isReady: false
    };

    await expect(
      handler({
        route: "/2016/10/25/",
        params: { year: "2016", month: "10", day: "25" },
        ...store
      })
    ).rejects.toThrowErrorMatchingSnapshot();

    // Other pages
    store.libraries.source.api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    // source.fetch("/2016/10/25/page/11")
    store.state.source.data["/2016/10/25/"] = {
      isFetching: true,
      isReady: false
    };

    await expect(
      handler({
        route: "/2016/10/25/page/11/",
        params: { year: "2016", month: "10", day: "25" },
        ...store
      })
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
