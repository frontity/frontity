import { createStore } from "frontity";
import { Frontity, MergePackages } from "frontity/types";
import clone from "clone-deep";
import merge from "deepmerge";
import { transformLink } from "../transform-link";
import wpSource from "../../";
import WpSource from "../../../types";

type Packages = MergePackages<Frontity, WpSource>;

describe("transformLink (w/o subdirectory)", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore<Packages>(config);
  };

  it("should work for Free WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for Free WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for Free WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.url and state.wpSource.isWpCom", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com";
    state.wpSource.isWpCom = true;

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com/subdir";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/subdir/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/subdir/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/");
  });

  it("should not add a trailing slash for links with hash part", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/#element-id" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/some-link/#element-id");
  });
});

describe("transformLink (w/ subdirectory)", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore<Packages>(config);
  };

  const subdirectory = "subdir";

  it("should work for Free WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.url and state.wpSource.isWpCom", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com";
    state.wpSource.isWpCom = true;

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.url = "https://wp-domain.com/subdir";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should not add a trailing slash for links with hash part", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/#element-id" };
    transformLink({ entity, state, subdirectory });

    expect(entity.link).toBe("/subdir/some-link/#element-id");
  });
});

describe("transformLink (state.source.subdirectory)", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore<Packages>(config);
  };

  it("should work for Free WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.url = "https://sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.url and state.wpSource.isWpCom", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.url = "https://wp-domain.com";
    state.wpSource.isWpCom = true;

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.url = "https://wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.source.url = "https://wp-domain.com/subdir";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.subdirectory = "/subdir";
    state.wpSource.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.subdirectory = "/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.subdirectory = "/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should not add a trailing slash for links with hash part", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com";
    state.source.subdirectory = "/subdir";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/#element-id" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/#element-id");
  });
});

describe("transformLink (state.frontity.url w/ subdirectory)", () => {
  const initStore = () => {
    const config = clone(merge(wpSource(), { state: { frontity: {} } }));
    return createStore<Packages>(config);
  };

  it("should work for Free WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.url = "https://sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Free WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/sub.wordpress.com";

    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.url and state.wpSource.isWpCom", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.url = "https://wp-domain.com";
    state.wpSource.isWpCom = true;

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for Personal and Premium WP com - configured by state.source.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.api =
      "https://public-api.wordpress.com/wp/v2/sites/wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.url = "https://wp-domain.com";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.source.url (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.url = "https://wp-domain.com/subdir";

    // Transform the link of an entity mock.
    const entity = { link: "/subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api = "https://wp-domain.com/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/wp-json/";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should work for WP org and Business WP com - configured by state.wpSource.api and custom prefix (w/ subdirectory)", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.wpSource.api = "https://wp-domain.com/wp-subdir/api/";
    state.wpSource.prefix = "/api";

    // Transform the link of an entity mock.
    const entity = { link: "/wp-subdir/some-link/" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/");
  });

  it("should not add a trailing slash for links with hash part", () => {
    const { state } = initStore();

    // Define the options set by the user.
    state.frontity.url = "https://final-domain.com/subdir";
    state.source.url = "https://wp-domain.com/";

    // Transform the link of an entity mock.
    const entity = { link: "/some-link/#element-id" };
    transformLink({ entity, state });

    expect(entity.link).toBe("/subdir/some-link/#element-id");
  });
});
