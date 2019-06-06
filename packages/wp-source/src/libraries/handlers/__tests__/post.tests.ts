import { State } from "frontity/types";
import WpSource from "../../../..";
import handler from "../post";
import { mockResponse } from "./mocks/helpers";
import routeUtils from "../../route-utils";

import Resolver from "../../resolver";
import Api from "../../api";

jest.mock("../../resolver");
jest.mock("../../api");

const post60 = {
  id: 60,
  date: "2016-11-25T18:31:11",
  slug: "the-beauties-of-gullfoss",
  type: "post",
  link: "https://test.frontity.io/2016/the-beauties-of-gullfoss/",
  author: 4,
  featured_media: 62,
  meta: [],
  categories: [57, 59, 56, 3, 8, 58],
  tags: [10, 9, 13, 11]
};

let state: State<WpSource>["source"];
let libraries: WpSource["libraries"];

beforeEach(() => {
  // mock resolver
  const resolver = new Resolver();

  // mock api
  const api = new Api();
  api.get = jest.fn().mockResolvedValue(mockResponse([post60]));

  // mock populate
  const populate = jest.fn().mockResolvedValue([
    {
      id: 60,
      slug: "the-beauties-of-gullfoss",
      link: "https://test.frontity.io/2016/the-beauties-of-gullfoss/"
    }
  ]);

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
      resolver,
      api,
      populate,
      ...routeUtils
    }
  };
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // source.fetch("/the-beauties-of-gullfoss/")
    state.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    await handler(state, {
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      libraries
    });

    expect(state.data).toMatchSnapshot();
  });

  test("exists in source.post", async () => {
    const get = libraries.source.api.get as jest.Mock;

    state.post[60] = post60;

    // source.fetch("/the-beauties-of-gullfoss/")
    state.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    await handler(state, {
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      libraries
    });

    expect(get).not.toBeCalled();
    expect(state.data).toMatchSnapshot();
  });

  test("throws an error if it doesn't exist", async () => {
    libraries.source.api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    libraries.source.populate = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    // source.fetch("/the-beauties-of-gullfoss/")
    state.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    const promise = handler(state, {
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      libraries
    });

    expect(promise).rejects.toThrowError();
  });
});
