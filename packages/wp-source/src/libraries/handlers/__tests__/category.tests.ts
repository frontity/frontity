import { State } from "@frontity/types";
import WpSource from "../../../..";
import populate from "../../populate";
import handler from "../category";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/postsCat7.json";

let state: State<WpSource>["source"];
let libraries: WpSource["libraries"];

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
        match: jest
          .fn()
          .mockReturnValue({ handler, params: { slug: "nature" } })
      },
      api: {
        apiUrl: "https://test.frontity.io",
        isCom: false,
        init: jest.fn(),
        getIdBySlug: jest.fn().mockResolvedValue(7),
        get: jest.fn().mockResolvedValue(
          mockResponse(posts, {
            "X-WP-Total": 10,
            "X-WP-TotalPages": 5
          })
        )
      },
      populate
    }
  };
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    // source.fetch("/category/nature/")
    state.dataMap["/category/nature/"] = { isFetching: true };

    await handler(state, {
      path: "/category/nature/",
      params: { slug: "nature" },
      libraries
    });

    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });

  test("exists in source.category but not in source.data", async () => {
    state.category[7] = {
      id: 7,
      count: 10,
      description: "",
      link: "https://test.frontity.io/category/nature/",
      name: "Nature",
      slug: "nature",
      taxonomy: "category",
      parent: 0,
      meta: []
    };

    // source.fetch("/category/nature/")
    state.dataMap["/category/nature/"] = { isFetching: true };

    await handler(state, {
      path: "/category/nature/",
      params: { slug: "nature" },
      libraries
    });

    expect(libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });

  test("exists in source.data but doesn't have page", async () => {
    const getIdBySlug = libraries.source.api.getIdBySlug as jest.Mock;

    state.dataMap["/category/nature/"] = {
      id: 7,
      isArchive: true,
      isCategory: true,
      isFetching: false,
      isReady: true,
      isTaxonomy: true,
      pages: [],
      taxonomy: "category",
      total: 10,
      totalPages: 1
    };

    // source.fetch("/category/nature/")
    await handler(state, {
      path: "/category/nature/",
      params: { slug: "nature" },
      libraries
    });

    expect(getIdBySlug).not.toBeCalled();
    expect(state.dataMap).toMatchSnapshot();
    expectEntities(state);
  });
});
