import { createStore } from "@frontity/connect";
import wpSource from "../";

jest.mock("../");

const initStore = (data = {}) => {
  const config = wpSource();
  // replace data by the one passed as argument
  config.state.source.data = data;
  return createStore(config);
};

describe("state - source.get", () => {
  test("returns an object with isReady/isFetching = false if not found", () => {
    const store = initStore();
    expect(store.state.source.get("/some-post/")).toEqual({
      isFetching: false,
      isReady: false
    });
  });

  test("returns the correct object (path)", () => {
    const post = {
      type: "post",
      id: 1,
      isPostType: true,
      isReady: true,
      isFetching: false
    };
    const { source } = initStore({ "/some-post/": post }).state;
    expect(source.get("/some-post")).toEqual(post);
    expect(source.get("/some-post/")).toEqual(post);
    expect(source.get("https://wp.site.test/some-post/")).toEqual(post);
  });

  test("returns the correct object (path, page)", () => {
    const archive = {
      taxonomy: "tag",
      id: 2,
      items: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isReady: true,
      isFetching: false
    };
    const { source } = initStore({ "/tag/some-tag/page/2/": archive }).state;
    expect(source.get("/tag/some-tag/page/2")).toEqual(archive);
    expect(source.get("/tag/some-tag/page/2/")).toEqual(archive);
    expect(source.get("https://wp.site.test/tag/some-tag/page/2/")).toEqual(
      archive
    );
  });

  test("returns the correct object (path, query)", () => {
    const archive = {
      taxonomy: "tag",
      id: 2,
      items: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isReady: true,
      isFetching: false
    };
    const { source } = initStore({ "/tag/some-tag/?s=search": archive }).state;
    expect(source.get("/tag/some-tag?s=search")).toEqual(archive);
    expect(source.get("/tag/some-tag/?s=search")).toEqual(archive);
    expect(source.get("https://wp.site.test/tag/some-tag/?s=search")).toEqual(
      archive
    );
  });

  test("returns the correct object (path, page, query)", () => {
    const archive = {
      taxonomy: "tag",
      id: 2,
      items: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isReady: true,
      isFetching: false
    };
    const { source } = initStore({
      "/tag/some-tag/page/2/?s=search": archive
    }).state;
    expect(source.get("/tag/some-tag/page/2/?s=search")).toEqual(archive);
    expect(source.get("/tag/some-tag/page/2?s=search")).toEqual(archive);
    expect(
      source.get("https://wp.site.test/tag/some-tag/page/2?s=search")
    ).toEqual(archive);
  });
});
