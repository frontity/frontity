import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { state, actions, effects } from "../../";
import handler from "../post";

import { mockResponse, expectEntities } from "./mocks/helpers";
import post60 from "./mocks/post60.json";

let mocks;
beforeEach(() => {
  mocks = {
    // Mock resolver
    resolver: {
      match: jest.fn().mockReturnValue({
        handler,
        params: { slug: "the-beauties-of-gullfoss" }
      })
    },
    // Mock api
    api: {
      get: jest.fn().mockResolvedValue(mockResponse(post60))
    },
    // Populate
    populate: jest.fn().mockResolvedValue([
      {
        id: 60,
        slug: "the-beauties-of-gullfoss",
        link: "https://test.frontity.io/2016/the-beauties-of-gullfoss/"
      }
    ])
  };
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/the-beauties-of-gullfoss/");

    expect(store.state.source.dataMap).toMatchSnapshot();
    // expectEntities(store.state.source);
  });

  test("exists in source.post", async () => {
    const config = namespaced({
      source: {
        actions,
        state: {
          ...state,
          post: {
            60: {
              id: 60,
              date: "2016-11-25T18:31:11",
              slug: "the-beauties-of-gullfoss",
              type: "post",
              link: "https://test.frontity.io/2016/the-beauties-of-gullfoss/",
              title: {},
              content: {},
              excerpt: {},
              author: 4,
              featured_media: 62,
              meta: [],
              categories: [57, 59, 56, 3, 8, 58],
              tags: [10, 9, 13, 11]
            }
          }
        },
        effects
      }
    });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/the-beauties-of-gullfoss/");

    expect(mocks.api.get).not.toBeCalled();
    expect(store.state.source.dataMap).toMatchSnapshot();
    // expectEntities(store.state.source);
  });

  test("throws an error if it doesn't exist", async () => {
    mocks.api.get = jest.fn().mockResolvedValueOnce(mockResponse([]));
    mocks.populate = jest.fn().mockResolvedValueOnce(mockResponse([]));

    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/the-beauties-of-gullfoss/");

    expect(store.state.source.dataMap).toMatchSnapshot();
    // expectEntities(store.state.source);
  });
});
