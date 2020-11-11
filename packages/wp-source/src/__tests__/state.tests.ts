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

describe("state.source.url & state.source.api", () => {
  const initStore = (data = {}) => {
    const config = clone(merge(wpSource(), data));
    return createStore(config);
  };

  test("Only setting the state.frontity.url", () => {
    const store = initStore({
      state: { frontity: { url: "http://domain.com" } },
    });
    expect(store.state.source.url).toBe("http://domain.com/");
    expect(store.state.source.api).toBe("http://domain.com/wp-json/");
    expect(store.state.wpSource.api).toBe("http://domain.com/wp-json/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("state.frontity.url containing final slash", () => {
    const store = initStore({
      state: { frontity: { url: "http://domain.com/" } },
    });
    expect(store.state.source.api).toBe("http://domain.com/wp-json/");
    expect(store.state.wpSource.api).toBe("http://domain.com/wp-json/");
    expect(store.state.source.url).toBe("http://domain.com/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("The correct prefix is being added", () => {
    const store = initStore({
      state: {
        frontity: { url: "http://domain.com/" },
        wpSource: { prefix: "/api" },
      },
    });
    // Has the correct prefix
    expect(store.state.source.api).toBe("http://domain.com/api/");
    expect(store.state.wpSource.api).toBe("http://domain.com/api/");
    expect(store.state.source.url).toBe("http://domain.com/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("Only setting the state.source.url", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/" },
      },
    });
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/wp-json/");
    expect(store.state.wpSource.api).toBe("http://backend.com/wp-json/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("Only setting the state.source.url with a folder", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/folder" },
      },
    });
    expect(store.state.source.url).toBe("http://backend.com/folder");
    expect(store.state.source.api).toBe("http://backend.com/folder/wp-json/");
    expect(store.state.wpSource.api).toBe("http://backend.com/folder/wp-json/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("The correct prefix is being added to state.source.url", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/" },
        wpSource: { prefix: "/api" },
      },
    });
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/api/");
    expect(store.state.wpSource.api).toBe("http://backend.com/api/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("The correct prefix is being added to state.source.url without trailing slash", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/" },
        wpSource: { prefix: "/api/" },
      },
    });
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/api/");
    expect(store.state.wpSource.api).toBe("http://backend.com/api/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("The correct query prefix is being added to state.source.url", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/" },
        wpSource: { prefix: "?rest_route=/" },
      },
    });
    // Has the correct prefix
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/?rest_route=/");
    expect(store.state.wpSource.api).toBe("http://backend.com/?rest_route=/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("The correct query prefix is being added to state.source.url with trailing slash", () => {
    const store = initStore({
      state: {
        source: { url: "http://backend.com/" },
        wpSource: { prefix: "?rest_route=/" },
      },
    });
    // Has the correct prefix
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/?rest_route=/");
    expect(store.state.wpSource.api).toBe("http://backend.com/?rest_route=/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("You can set the source.url later", () => {
    const store = initStore();
    store.state.source.url = "http://backend.com/";
    expect(store.state.source.url).toBe("http://backend.com/");
    expect(store.state.source.api).toBe("http://backend.com/wp-json/");
    expect(store.state.wpSource.api).toBe("http://backend.com/wp-json/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("Only setting the state.source.api", () => {
    const store = initStore({
      state: {
        frontity: { url: "http://domain.com" },
        source: { api: "http://backend.com/wp-json" },
      },
    });
    expect(store.state.source.api).toBe("http://backend.com/wp-json");
    expect(store.state.wpSource.api).toBe("http://backend.com/wp-json");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("Setting both state.source.url and state.source.api", () => {
    const store = initStore({
      state: {
        source: {
          url: "http://backend.com",
          api: "http://backend.com/wp-json/",
        },
      },
    });
    expect(store.state.source.url).toBe("http://backend.com");
    expect(store.state.source.api).toBe("http://backend.com/wp-json/");
    expect(store.state.wpSource.api).toBe("http://backend.com/wp-json/");
    expect(store.state.source.isWpCom).toBe(false);
    expect(store.state.wpSource.isWpCom).toBe(false);
  });

  test("Only setting state.frontity.url to a WordPress.com domain", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://domain.wordpress.com" },
      },
    });
    expect(store.state.source.url).toBe("https://domain.wordpress.com/");
    expect(store.state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.source.isWpCom).toBe(true);
    expect(store.state.wpSource.isWpCom).toBe(true);
  });

  test("Only setting state.frontity.url to a WordPress.com domain with ending slash", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://domain.wordpress.com/" },
      },
    });
    expect(store.state.source.url).toBe("https://domain.wordpress.com/");
    expect(store.state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.source.isWpCom).toBe(true);
    expect(store.state.wpSource.isWpCom).toBe(true);
  });

  test("Only setting state.source.url to a WordPress.com domain", () => {
    const store = initStore({
      state: {
        source: { url: "https://domain.wordpress.com" },
      },
    });
    expect(store.state.source.url).toBe("https://domain.wordpress.com");
    expect(store.state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.source.isWpCom).toBe(true);
    expect(store.state.wpSource.isWpCom).toBe(true);
  });

  test("Only setting state.source.url to a WordPress.com domain with ending slash", () => {
    const store = initStore({
      state: {
        source: { url: "https://domain.wordpress.com/" },
      },
    });
    expect(store.state.source.url).toBe("https://domain.wordpress.com/");
    expect(store.state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/https://domain.wordpress.com/"
    );
    expect(store.state.source.isWpCom).toBe(true);
    expect(store.state.wpSource.isWpCom).toBe(true);
  });
});
