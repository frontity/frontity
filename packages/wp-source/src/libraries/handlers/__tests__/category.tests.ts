import { State } from "frontity/types";
import WpSource from "../../../..";
import populate from "../../populate";
import routeUtils from "../../route-utils";
import handler from "../category";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/postsCat7.json";

let state: State<WpSource>["source"];
let libraries: WpSource["libraries"];

beforeEach(() => {
  // mock state
  state = {
    get: () => ({ isReady: false, isFetching: false }),
    data: {},
    category: {},
    tag: {},
    post: {},
    page: {},
    author: {},
    attachment: {},
    api: "https://test.frontity.io",
    isWPCom: false
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
        api: "https://test.frontity.io",
        isWPCom: false,
        init: jest.fn(),
        getIdBySlug: jest.fn().mockResolvedValue(7),
        get: jest.fn().mockResolvedValue(
          mockResponse(posts, {
            "X-WP-Total": 10,
            "X-WP-TotalPages": 5
          })
        )
      },
      populate,
      ...routeUtils
    }
  };
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    // source.fetch("/category/nature/")
    state.data["/category/nature/"] = { isFetching: true, isReady: false };

    await handler(state, {
      route: "/category/nature/",
      params: { slug: "nature" },
      libraries
    });

    expect(state.data).toMatchSnapshot();
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
    state.data["/category/nature/"] = { isFetching: true, isReady: false };

    await handler(state, {
      route: "/category/nature/",
      params: { slug: "nature" },
      libraries
    });

    expect(libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(state.data).toMatchSnapshot();
    expectEntities(state);
  });

  test("works with pagination", async () => {
    // source.fetch("/category/nature/2/")
    state.data["/category/nature/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    await handler(state, {
      route: "/category/nature/page/2/",
      params: { slug: "nature" },
      libraries
    });

    expect(state.data).toMatchSnapshot();
    expectEntities(state);
  });
});
