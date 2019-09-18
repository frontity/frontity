import { createStore, InitializedStore } from "@frontity/connect";
import { Response as NodeResponse } from "node-fetch";
import clone from "clone-deep";
import wpSource from "../../";
import WpSource from "../../../types";
import populate from "../populate";
import posts from "../handlers/__tests__/mocks/post-archive/posts.json";
import postsSubdir from "../handlers/__tests__/mocks/post-archive/posts-subdir.json";
import cpts from "../handlers/__tests__/mocks/cpt-archive/cpts.json";

const initStore = (): InitializedStore<WpSource> => {
  const config = clone(wpSource());
  return createStore(config);
};

// Use Response from "node-fetch" to mock response objects,
// but with "lib.dom.d.ts" Response type.
const mockResponse = (body): Response =>
  (new NodeResponse(JSON.stringify(body)) as object) as Response;

describe("populate", () => {
  test("adds posts and embedded into state", async () => {
    const { state } = initStore();
    const response = mockResponse(posts);
    const result = await populate({ state, response });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });

  test("removes WP API path from links", async () => {
    const { state } = initStore();
    state.source.api = "https://test.frontity.io/subdirectory/wp-json";

    const response = mockResponse(postsSubdir);
    const result = await populate({ state, response });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });

  test("transforms links if subdirectory is specified", async () => {
    const { state } = initStore();
    state.source.api = "https://test.frontity.io/subdirectory/wp-json";

    const response = mockResponse(postsSubdir);
    const subdirectory = "/blog/";
    const result = await populate({ state, response, subdirectory });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });

  test("add new custom post types & taxonomies to the state", async () => {
    const { state } = initStore();
    const response = mockResponse(cpts);
    const result = await populate({ state, response });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });
});
