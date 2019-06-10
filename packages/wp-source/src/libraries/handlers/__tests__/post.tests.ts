import { State } from "frontity/types";
import { createStore } from "@frontity/connect";
import WpSource from "../../../..";
import handler from "../post";
import { mockResponse } from "./mocks/helpers";

import wpSource from "../../../";
jest.mock("../../../");

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

let state: State<WpSource>;
let libraries: WpSource["libraries"];

beforeEach(() => {
  const config = wpSource();
  const { api, populate } = config.libraries.source;

  // mock api
  (api.get as jest.Mock).mockResolvedValue(mockResponse([post60]));

  // mock populate
  (populate as jest.Mock).mockResolvedValue([
    {
      id: 60,
      slug: "the-beauties-of-gullfoss",
      link: "https://test.frontity.io/2016/the-beauties-of-gullfoss/"
    }
  ]);

  ({ state, libraries } = createStore(config));
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // source.fetch("/the-beauties-of-gullfoss/")
    await handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      state,
      libraries
    });

    expect(state.source.data).toMatchSnapshot();
  });

  test("exists in source.post", async () => {
    const get = libraries.source.api.get as jest.Mock;

    state.source.post[60] = post60;

    // source.fetch("/the-beauties-of-gullfoss/")
    await handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      state,
      libraries
    });

    expect(get).not.toBeCalled();
    expect(state.source.data).toMatchSnapshot();
  });

  test("throws an error if it doesn't exist", async () => {
    libraries.source.api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    libraries.source.populate = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    // source.fetch("/the-beauties-of-gullfoss/")
    const promise = handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      state,
      libraries
    });

    expect(promise).rejects.toThrowError();
  });
});
