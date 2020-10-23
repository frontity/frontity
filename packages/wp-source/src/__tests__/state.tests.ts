import { createStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../";
import merge from "deepmerge";

const initStore = (data = {}) => {
  const config = clone(
    merge(
      wpSource(),
      {
        state: {
          router: {},
        },
      },
      { clone: false }
    )
  );
  // replace data by the one passed as argument
  config.state.source.data = data;
  return createStore(config);
};

describe("state.source.get", () => {
  test("returns an object with isReady/isFetching = false if not found", () => {
    const store = initStore();
    expect(store.state.source.get("/some-post/")).toEqual({
      isFetching: false,
      isReady: false,
      link: "/some-post/",
      page: 1,
      query: {},
      route: "/some-post/",
    });
  });

  test("returns the correct object (path)", () => {
    const post = {
      type: "post",
      id: 1,
      isPostType: true,
      isReady: true,
      isFetching: false,
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
      isFetching: false,
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
      isFetching: false,
    };
    const { source } = initStore({ "/tag/some-tag/?s=search": archive }).state;
    expect(source.get("/tag/some-tag?s=search")).toEqual(archive);
    expect(source.get("/tag/some-tag/?s=search")).toEqual(archive);
    expect(source.get("https://wp.site.test/tag/some-tag/?s=search")).toEqual(
      archive
    );
  });

  test("returns the correct object (path, unordered query)", () => {
    const archive = {
      taxonomy: "tag",
      id: 2,
      items: [],
      isArchive: true,
      isTaxonomy: true,
      isTag: true,
      isReady: true,
      isFetching: false,
    };
    const { source } = initStore({
      "/tag/some-tag/?k1=v1&k2=v2": archive,
    }).state;
    expect(source.get("/tag/some-tag?k2=v2&k1=v1")).toEqual(archive);
    expect(source.get("/tag/some-tag/?k2=v2&k1=v1")).toEqual(archive);
    expect(
      source.get("https://wp.site.test/tag/some-tag/?k2=v2&k1=v1")
    ).toEqual(archive);
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
      isFetching: false,
    };
    const { source } = initStore({
      "/tag/some-tag/page/2/?s=search": archive,
    }).state;
    expect(source.get("/tag/some-tag/page/2/?s=search")).toEqual(archive);
    expect(source.get("/tag/some-tag/page/2?s=search")).toEqual(archive);
    expect(
      source.get("https://wp.site.test/tag/some-tag/page/2?s=search")
    ).toEqual(archive);
  });
});
