import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { state, actions, effects } from "../../";
import handler from "../category";

import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "./mocks/postsCat7.json";

let mocks;
beforeEach(() => {
  mocks = {
    // Mock resolver
    resolver: {
      match: jest.fn().mockReturnValue({ handler, params: { slug: "nature" } })
    },
    // Mock api
    api: {
      getIdBySlug: jest.fn().mockResolvedValue(7),
      get: jest.fn().mockResolvedValue(
        mockResponse(posts, {
          "X-WP-Total": 10,
          "X-WP-TotalPages": 5
        })
      )
    },
    // Populate
    populate: effects.populate
  };
});

describe("category", () => {
  test("doesn't exist in source.category", async () => {
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("exists in source.category but not in source.data", async () => {
    const config = namespaced({
      source: {
        actions,
        state: {
          ...state,
          category: {
            7: {
              id: 7,
              count: 10,
              description: "",
              link: "https://test.frontity.io/category/nature/",
              name: "Nature",
              slug: "nature",
              taxonomy: "category",
              parent: 0,
              meta: []
            }
          }
        },
        effects
      }
    });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(mocks.api.getIdBySlug).not.toBeCalled();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("exists in source.data but doesn't have page", async () => {
    const config = namespaced({
      source: {
        actions,
        state: {
          ...state,
          dataMap: {
            "/category/nature/": {
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
            }
          }
        },
        effects
      }
    });

    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(mocks.api.getIdBySlug).not.toBeCalled();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });
});
