import { createStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "../";
import merge from "deepmerge";

describe("state.source.get", () => {
  const initStore = (data = {}) => {
    const config = clone(wpSource());
    // replace data by the one passed as argument
    config.state.source.data = data;
    return createStore(config);
  };

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

describe("state.wpSource.isWpCom (state.source.isWpCom)", () => {
  const initStore = (data = {}) => {
    const config = clone(merge(wpSource(), data));
    return createStore(config);
  };

  it("should be false (state.frontity.url, state.source.url not WP com subdomain)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        source: { url: "https://wp-domain.com/" },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(false);
    expect(store.state.source.isWpCom).toBe(false);
  });

  it("should be false (state.frontity.url, state.wpSource.api not WP com)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        wpSource: { api: "https://wp-domain.com/wp-json/" },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(false);
    expect(store.state.source.isWpCom).toBe(false);
  });

  it("should be false (state.frontity.url, state.source.api not WP com)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        source: { api: "https://wp-domain.com/wp-json/" },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(false);
    expect(store.state.source.isWpCom).toBe(false);
  });

  it("should be true (state.frontity.url, state.source.url is WP com subdomain)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        source: { url: "https://sub.wordpress.com/" },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(true);
    expect(store.state.source.isWpCom).toBe(true);
  });

  it("should be true (state.frontity.url, state.wpSource.api is WP com)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        wpSource: {
          api:
            "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/",
        },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(true);
    expect(store.state.source.isWpCom).toBe(true);
  });

  it("should be true (state.frontity.url, state.source.api is WP com)", () => {
    const store = initStore({
      state: {
        frontity: { url: "https://final-domain.com/" },
        source: {
          api:
            "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/",
        },
      },
    });
    expect(store.state.wpSource.isWpCom).toBe(true);
    expect(store.state.source.isWpCom).toBe(true);
  });
});

describe("state.wpSource.api (state.source.api)", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore(config);
  };

  it("should return a WP org and Business WP com API (state.frontity.url)", () => {
    const { state } = initStore();

    // With trailing slash.
    state.frontity.url = "https://final-domain.com/";
    expect(state.wpSource.api).toBe("https://final-domain.com/wp-json/");
    expect(state.source.api).toBe("https://final-domain.com/wp-json/");

    // Without trailing slash.
    state.frontity.url = "https://final-domain.com";
    expect(state.wpSource.api).toBe("https://final-domain.com/wp-json/");
    expect(state.source.api).toBe("https://final-domain.com/wp-json/");
  });

  it("should return a WP org and Business WP com API (state.source.url)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With trailing slash.
    state.source.url = "https://wp-domain.com/";
    expect(state.wpSource.api).toBe("https://wp-domain.com/wp-json/");
    expect(state.source.api).toBe("https://wp-domain.com/wp-json/");

    // Without trailing slash.
    state.source.url = "https://wp-domain.com";
    expect(state.wpSource.api).toBe("https://wp-domain.com/wp-json/");
    expect(state.source.api).toBe("https://wp-domain.com/wp-json/");
  });

  it("should return a WP org and Business WP com API (state.frontity.url, prefix)", () => {
    const { state } = initStore();

    // With a trailing slash and different combinations of `prefix`.
    state.frontity.url = "https://final-domain.com/";
    state.wpSource.prefix = "api";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "api/";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "/api";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "/api/";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");

    // Without a trailing slash.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.prefix = "api";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "api/";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "/api";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
    state.wpSource.prefix = "/api/";
    expect(state.wpSource.api).toBe("https://final-domain.com/api/");
    expect(state.source.api).toBe("https://final-domain.com/api/");
  });

  it("should return a WP org and Business WP com API (state.source.url, prefix)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash and different combinations of `prefix`.
    state.source.url = "https://wp-domain.com/";
    state.wpSource.prefix = "api";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "api/";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "/api";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "/api/";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");

    // Without a trailing slash.
    state.source.url = "https://wp-domain.com";
    state.wpSource.prefix = "api";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "api/";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "/api";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
    state.wpSource.prefix = "/api/";
    expect(state.wpSource.api).toBe("https://wp-domain.com/api/");
    expect(state.source.api).toBe("https://wp-domain.com/api/");
  });

  it("should return a WP com API (state.frontity.url, state.wpSource.isWpCom)", () => {
    const { state } = initStore();

    state.wpSource.isWpCom = true;

    // With final slash.
    state.frontity.url = "https://final-domain.com/";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/final-domain.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/final-domain.com/"
    );

    // Without final slash.
    state.frontity.url = "https://final-domain.com";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/final-domain.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/final-domain.com/"
    );
  });

  it("should return a WP com API (state.source.url - Free WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With trailing slash.
    state.source.url = "https://sub.wordpress.com/";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/"
    );

    // Without trailing slash.
    state.source.url = "https://sub.wordpress.com";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com/"
    );
  });

  it("should return a WP com API (state.source.url, state.wpSource.isWpCom)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";
    state.wpSource.isWpCom = true;

    // With final slash.
    state.source.url = "https://wp-domain.com/";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/"
    );

    // Without final slash.
    state.source.url = "https://wp-domain.com";
    expect(state.wpSource.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/"
    );
    expect(state.source.api).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/"
    );
  });
});

describe("state.source.url", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore(config);
  };

  it("should return state.frontity.url if no other props are set (embedded)", () => {
    const { state } = initStore();

    // With a trailing slash.
    state.frontity.url = "https://final-domain.com/";
    expect(state.source.url).toBe("https://final-domain.com/");

    // Without a trailing slash.
    state.frontity.url = "https://final-domain.com";
    expect(state.source.url).toBe("https://final-domain.com/");
  });

  it("should derive from state.wpSource.api (WP org and Business WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash.
    state.wpSource.api = "https://wp-domain.com/wp-json/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.wpSource.api = "https://wp-domain.com/wp-json";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });

  it("should derive from state.source.api (WP org and Business WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash.
    state.source.api = "https://wp-domain.com/wp-json/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.source.api = "https://wp-domain.com/wp-json";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });

  it("should derive from state.wpSource.api and prefix (WP org and Business WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash and different combinations of `prefix`.
    state.wpSource.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.wpSource.api = "https://wp-domain.com/api";
    state.wpSource.prefix = "api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });

  it("should derive from state.source.api and prefix (WP org and Business WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash and different combinations of `prefix`.
    state.source.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.source.api = "https://wp-domain.com/api";
    state.wpSource.prefix = "api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api";
    expect(state.source.url).toBe("https://wp-domain.com/");
    state.wpSource.prefix = "/api/";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });

  it("should derive from state.wpSource.api (Free, Personal and Premium WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash.
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });

  it("should derive from state.source.api (Free, Personal and Premium WP com)", () => {
    const { state } = initStore();

    state.frontity.url = "https://final-domain.com/";

    // With a trailing slash.
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com/";
    expect(state.source.url).toBe("https://wp-domain.com/");

    // Without a trailing slash.
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";
    expect(state.source.url).toBe("https://wp-domain.com/");
  });
});
