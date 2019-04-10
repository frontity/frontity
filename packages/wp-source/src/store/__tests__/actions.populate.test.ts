import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { actions, effects } from "..";

import posts from "./mocks/populate/posts.json";
import pages from "./mocks/populate/pages.json";

let state;
beforeEach(() => {
  // empty state
  state = {
    name: {},
    taxonomy: {},
    category: {},
    tag: {},
    type: {},
    post: {},
    page: {},
    author: {},
    attachment: {}
  };
});

describe("actions", () => {
  test("populate list of posts", async () => {
    // add name object as the fetch function should do
    state.name["/"] = {
      items: [],
      pages: []
    };

    // create store
    const store = createOvermindMock(
      namespaced({ source: { actions, state, effects } })
    );

    // add entities to store
    await store.actions.source.populate({
      name: "/",
      entities: posts,
      page: 1
    });

    // Check that posts and embedded entities are populated
    expect(store.state.source.post).toMatchSnapshot();
    expect(store.state.source.category).toMatchSnapshot();
    expect(store.state.source.tag).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
  });

  test("populate pages", async () => {
    // Create store
    const store = createOvermindMock(
      namespaced({ source: { actions, state, effects } })
    );

    // Populate store
    await Promise.all(
      pages.map(page =>
        store.actions.source.populate({
          name: new URL(page.link).pathname,
          entities: page
        })
      )
    );

    // Check that pages are populated
    expect(store.state.source.post).toMatchSnapshot();
    expect(store.state.source.category).toMatchSnapshot();
    expect(store.state.source.tag).toMatchSnapshot();
    expect(store.state.source.attachment).toMatchSnapshot();
    expect(store.state.source.author).toMatchSnapshot();
  });
});
