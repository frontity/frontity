import { State, Libraries } from "../../../type";
import populate from "../../populate";
import handler from "../date";

import { mockResponse, expectEntities } from "./mocks/helpers";
import posts2016 from "./mocks/posts2016.json";
import posts2016p2 from "./mocks/posts2016p2.json";
import posts20161025 from "./mocks/posts2016-10-25.json";

let state: State["source"];
let libraries: Libraries;

beforeEach(() => {
  // mock state
  state = {
    data: () => ({}),
    dataMap: {},
    category: {},
    tag: {},
    post: {},
    page: {},
    author: {},
    attachment: {},
    apiUrl: "https://test.frontity.io",
    isCom: false
  };
  // mock libraries
  libraries = {
    source: {
      resolver: {
        registered: [],
        init: jest.fn(),
        add: jest.fn(),
        match: jest.fn()
      },
      api: {
        apiUrl: "https://test.frontity.io",
        isCom: false,
        init: jest.fn(),
        getIdBySlug: jest.fn(),
        get: jest.fn()
      },
      populate
    }
  };
});

describe("date", () => {
  test("get two pages of year 2016", async () => {
    const get = libraries.source.api.get as jest.Mock;

    get.mockResolvedValueOnce(
      mockResponse(posts2016, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    // source.fetch("/2016/")
    state.dataMap["/2016/"] = { isFetching: true };

    await handler(state, {
      path: "/2016/",
      params: { year: "2016" },
      libraries
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);

    get.mockResolvedValueOnce(
      mockResponse(posts2016p2, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    // source.fetch({ path: "/2016/", page: 2 })
    state.dataMap["/2016/"].isFetching = true;

    await handler(state, {
      path: "/2016/",
      page: 2,
      params: { year: "2016" },
      libraries
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });

  test("doesn't exist in dataMap (2016/10)", async () => {
    const get = libraries.source.api.get as jest.Mock;

    get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/2016/10/")
    state.dataMap["/2016/10/"] = { isFetching: true };

    await handler(state, {
      path: "/2016/10/",
      params: { year: "2016", month: "10" },
      libraries
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });

  test("doesn't exist in dataMap (2016/10/25)", async () => {
    const get = libraries.source.api.get as jest.Mock;

    get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    // source.fetch("/2016/10/25/")
    state.dataMap["/2016/10/25/"] = { isFetching: true };

    await handler(state, {
      path: "/2016/10/25/",
      params: { year: "2016", month: "10", day: "25" },
      libraries
    });

    expect(get.mock.calls).toMatchSnapshot();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });
});
