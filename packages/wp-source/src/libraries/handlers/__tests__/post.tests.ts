import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../../../types";
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

let store: InitializedStore<WpSource>;

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

  store = createStore(config);
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // source.fetch("/the-beauties-of-gullfoss/")
    store.state.source.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      ...store
    });

    expect(store.state.source.data).toMatchSnapshot();
  });

  test("exists in source.post", async () => {
    const get = store.libraries.source.api.get as jest.Mock;

    store.state.source.post[60] = post60;

    // source.fetch("/the-beauties-of-gullfoss/")
    store.state.source.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      ...store
    });

    expect(get).not.toBeCalled();
    expect(store.state.source.data).toMatchSnapshot();
  });

  test("throws an error if it doesn't exist", async () => {
    store.libraries.source.api.get = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    store.libraries.source.populate = jest
      .fn()
      .mockResolvedValueOnce(mockResponse([]));

    // source.fetch("/the-beauties-of-gullfoss/")
    store.state.source.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    const promise = handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      ...store
    });

    expect(promise).rejects.toThrowError();
  });

  test("fetchs from a different endpoint with extra params", async () => {
    // change the default post endpoint and params
    store.state.source.postEndpoint = "multiple-post-type";
    store.state.source.params = { type: ["post", "travel"] };

    // source.fetch("/the-beauties-of-gullfoss/")
    store.state.source.data["/the-beauties-of-gullfoss/"] = {
      isFetching: true,
      isReady: false
    };

    await handler({
      route: "/the-beauties-of-gullfoss/",
      params: { slug: "the-beauties-of-gullfoss" },
      ...store
    });

    const apiGet = jest.spyOn(store.libraries.source.api, "get");
    expect(apiGet.mock.calls).toMatchSnapshot();
  });
});
