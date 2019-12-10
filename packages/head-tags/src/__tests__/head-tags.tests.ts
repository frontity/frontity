import clone from "clone-deep";
import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "@frontity/wp-source/src";
import HeadTagsPackage, { PostTypeWithHeadTags } from "../../types";
import headTagsPackage from "..";
import { getCurrentHeadTags } from "../components";

// Import all mocks.
import postType from "./mocks/post-type.json";

let store: InitializedStore<HeadTagsPackage>;
beforeEach(() => {
  // Create store.
  const config: HeadTagsPackage = clone(headTagsPackage());

  // Mock wp-source state.
  const {
    state: { source }
  } = clone(wpSource());
  config.state.source = source;
  config.state.source.api = "https://test.frontity.io/wp-json";

  // Mock router state.
  config.state.router = { link: "/" };

  // Mock site url.
  config.state.frontity = { url: "https://mars.frontity.org" };

  // Initialize store.
  store = createStore(config);
});

describe("HeadTags component", () => {
  test("works with post archive", () => {
    // Populate source state.
    store.state.source.type = {
      post: postType as PostTypeWithHeadTags
    };
    store.state.source.data = {
      "/": {
        type: "post",
        items: [],
        isArchive: true,
        isPostTypeArchive: true,
        isPostArchive: true,
        isHome: true,
        isFetching: false,
        isReady: true
      }
    };

    // Populate router state.
    store.state.router.link = "/";

    // Test current head tags.
    expect(getCurrentHeadTags({ ...store })).toMatchSnapshot();
  });
  test.todo("add tests");
});
