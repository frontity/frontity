import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { effects } from "..";
import { populate } from "../actions";

import posts from "./mocks/populate/posts.json";
import pages from "./mocks/populate/pages.json";

let store;
beforeEach(() => {
  // empty state
  const state = {
    data: {},
    taxonomy: {},
    category: {},
    tag: {},
    type: {},
    post: {},
    page: {},
    author: {},
    attachment: {}
  };

  // actions
  const actions = {
    populate,
    fetch: jest.fn(async () => {})
  };

  // create store
  store = createOvermindMock(
    namespaced({ source: { actions, state, effects } })
  );
});

describe("actions", () => {
  test("populate list of posts", async () => {
    // add entities to store
    await store.actions.source.populate({ entities: posts });

    // Check that posts and embedded entities are populated
    expect(store.state.source.post).toMatchSnapshot();
    expect(store.state.source.category).toMatchSnapshot();
    expect(store.state.source.tag).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
  });

  test("populate pages", async () => {
    // add entities to store
    await store.actions.source.populate({ entities: pages });

    // check that pages are populated
    expect(store.state.source.post).toMatchSnapshot();
    expect(store.state.source.category).toMatchSnapshot();
    expect(store.state.source.tag).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
  });
});
