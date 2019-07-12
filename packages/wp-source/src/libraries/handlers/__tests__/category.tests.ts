import { State } from "frontity/types";
import { createStore } from "@frontity/connect";

import WpSource from "../../../../types";
import populate from "../../populate";
import handler from "../category";
import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/posts-cat-7.json";

import wpSource from "../../../";
jest.mock("../../../");

let state: State<WpSource>;
let libraries: WpSource["libraries"];

beforeEach(() => {
  const config = wpSource();
  const { source } = config.libraries;
  const { api } = source;

  // mock api
  api.getIdBySlug = jest.fn().mockResolvedValue(7);
  api.get = jest.fn().mockResolvedValue(
    mockResponse(posts, {
      "X-WP-Total": 10,
      "X-WP-TotalPages": 5
    })
  );
  // use populate implementation
  (source.populate as jest.Mock).mockImplementation(populate);

  ({ state, libraries } = createStore(config));
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    // source.fetch("/category/nature/")
    state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/",
      params: { slug: "nature" },
      state,
      libraries
    });

    expect(state.source.data).toMatchSnapshot();
    expectEntities(state.source);
  });

  test("exists in source.category but not in source.data", async () => {
    state.source.category[7] = {
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
    state.source.data["/category/nature/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/",
      params: { slug: "nature" },
      state,
      libraries
    });

    expect(libraries.source.api.getIdBySlug).not.toBeCalled();
    expect(state.source.data).toMatchSnapshot();
    expectEntities(state.source);
  });

  test("works with pagination", async () => {
    // source.fetch("/category/nature/")
    state.source.data["/category/nature/page/2/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/category/nature/page/2/",
      params: { slug: "nature" },
      state,
      libraries
    });

    expect(state.source.data).toMatchSnapshot();
    expectEntities(state.source);
  });
});
