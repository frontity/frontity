import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { state, actions, effects } from "../../";
import handler from "../category";

import { mockResponse, expectEntities } from "./mocks/helpers";
import posts from "../../__tests__/mocks/postsFromCategory.json";


describe("category", () => {
  test("doesn't exist in source.category", async () => {
    const path = "/category/nature/";
    const slug = "nature";

    // Mock resolver
    const resolver = {
      match: jest.fn().mockReturnValue({ handler, params: { slug } })
    };
    // Mock get responses
    const api = {
      getIdBySlug: jest.fn().mockResolvedValue(7),
      get: jest.fn().mockResolvedValue(
        mockResponse(posts, {
          "X-WP-Total": 10,
          "X-WP-TotalPages": 1
        })
      )
    };
    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, {
      source: { resolver, api, populate: effects.populate }
    });

    await store.actions.source.fetch(path);
    expect(api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();

    // Check that all entities are being populated
    expectEntities(store.state.source);
  });

  test("exists in source.category but not in source.data", () => {});
  test("exists in source.data but doesn't have page", () => {});
  test("throws an error if it doesn't exist", () => {});
});
