import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "@frontity/wp-source/src";
import WpSource from "@frontity/wp-source/types";
import AMP from "../../types";
import { MergePackages } from "frontity/types";
import Amp from "..";

let store: InitializedStore<MergePackages<WpSource, AMP>>;
describe("AMP tests", () => {
  beforeEach(() => {
    // Initialize the store
    store = createStore<MergePackages<WpSource, AMP>>(
      clone({ ...wpSource(), ...Amp }, { clone: false })
    );
    store.state.source.url = "https://test.frontity.org/";
  });

  test("final `/amp` path is removed", () => {
    store.actions.amp.init();
    const { normalize } = store.libraries.source;

    expect(normalize("/amp")).toBe("/");
    expect(normalize("/posts/amp/")).toBe("/posts/");
    expect(normalize("/some-page/amp/")).toBe("/some-page/");
    expect(normalize("/parent/some-page/amp/")).toBe("/parent/some-page/");
    expect(normalize("/category/some/amp/")).toBe("/category/some/");
    expect(normalize("/tag/some/amp/")).toBe("/tag/some/");
    expect(normalize("/taxonomy/some/amp/")).toBe("/taxonomy/some/");

    expect(normalize("/amp/?a=1&b=1#some-hash")).toBe("/?a=1&b=1#some-hash");
    expect(normalize("/amp/page/3/?a=1&b=1#some-hash")).toBe(
      "/page/3/?a=1&b=1#some-hash"
    );
    expect(normalize("/taxonomy/some/amp/?a=1&b=1#some-hash")).toBe(
      "/taxonomy/some/?a=1&b=1#some-hash"
    );
    expect(normalize("/taxonomy/some/page/3/?a=1&b=1#some-hash")).toBe(
      "/taxonomy/some/page/3/?a=1&b=1#some-hash"
    );

    // These ones are not correct, but it is expected because Frontity does not
    // support using `amp` as a [term] (https://wordpress.org/support/article/glossary/#term)
    // for the time being.
    expect(normalize("/category/amp/")).toBe("/category/");
    expect(normalize("/tag/amp/")).toBe("/tag/");
    expect(normalize("/taxonomy/amp/")).toBe("/taxonomy/");
    expect(normalize("/author/amp/")).toBe("/author/");
  });

  test(`Compare the output of libraries.source.normalize() between the AMP package and the default implementation`, () => {
    // Get the reference to normalize() before it's overriden in the init() action.
    const { normalize } = store.libraries.source;
    store.actions.amp.init();

    // The implementation of normalize() from the AMP package.
    const { normalize: normalizeAmp } = store.libraries.source;

    expect(normalize("/")).toEqual(normalizeAmp("/"));
    expect(normalize("/some-post/")).toEqual(normalizeAmp("/some-post/"));
    expect(normalize("/some-page/")).toEqual(normalizeAmp("/some-page/"));
    expect(normalize("/parent/some-page/")).toEqual(
      normalizeAmp("/parent/some-page/")
    );
    expect(normalize("/category/some/")).toEqual(
      normalizeAmp("/category/some/")
    );
    expect(normalize("/tag/some/")).toEqual(normalizeAmp("/tag/some/"));
    expect(normalize("/taxonomy/some/")).toEqual(
      normalizeAmp("/taxonomy/some/")
    );
    expect(normalize("/?a=1&b=1#some-hash")).toEqual(
      normalizeAmp("/?a=1&b=1#some-hash")
    );
    expect(normalize("/page/3/?a=1&b=1#some-hash")).toEqual(
      normalizeAmp("/page/3/?a=1&b=1#some-hash")
    );
    expect(normalize("/taxonomy/some/?a=1&b=1#some-hash")).toEqual(
      normalizeAmp("/taxonomy/some/?a=1&b=1#some-hash")
    );
    expect(normalize("/taxonomy/some/page/3/?a=1&b=1#some-hash")).toEqual(
      normalizeAmp("/taxonomy/some/page/3/?a=1&b=1#some-hash")
    );
  });

  test("Compare the output of libraries.source.parse() between the AMP package and the default implementation", () => {
    // Get the reference to parse() before it's overriden in the init() action.
    const { parse } = store.libraries.source;
    store.actions.amp.init();

    // The implementation of parse() from the AMP package.
    const { parse: parseAmp } = store.libraries.source;

    expect(parse("/")).toEqual(parseAmp("/"));
    expect(parse("/some-post/")).toEqual(parseAmp("/some-post/"));
    expect(parse("/some-page/")).toEqual(parseAmp("/some-page/"));
    expect(parse("/parent/some-page/")).toEqual(parseAmp("/parent/some-page/"));
    expect(parse("/category/some/")).toEqual(parseAmp("/category/some/"));
    expect(parse("/tag/some/")).toEqual(parseAmp("/tag/some/"));
    expect(parse("/taxonomy/some/")).toEqual(parseAmp("/taxonomy/some/"));
    expect(parse("/?a=1&b=1#some-hash")).toEqual(
      parseAmp("/?a=1&b=1#some-hash")
    );
    expect(parse("/page/3/?a=1&b=1#some-hash")).toEqual(
      parseAmp("/page/3/?a=1&b=1#some-hash")
    );
    expect(parse("/taxonomy/some/?a=1&b=1#some-hash")).toEqual(
      parseAmp("/taxonomy/some/?a=1&b=1#some-hash")
    );
    expect(parse("/taxonomy/some/page/3/?a=1&b=1#some-hash")).toEqual(
      parseAmp("/taxonomy/some/page/3/?a=1&b=1#some-hash")
    );
  });

  test("Compare the output of libraries.source.stringify() between the AMP package and the default implementation", () => {
    // Get the reference to stringify() before it's overriden in the init() action.
    const { stringify } = store.libraries.source;
    store.actions.amp.init();

    // The implementation of stringify() from the AMP package.
    const { stringify: stringifyAmp } = store.libraries.source;

    let linkParams: any = { path: "/some/path" };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = { path: "custom-list" };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = { path: "/some/path/", page: 2 };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = {
      path: "/some/path",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2",
      },
    };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = {
      path: "/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2",
      },
    };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = { route: "/some/path" };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = { route: "custom-list" };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = { route: "/some/path/", page: 2 };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = {
      route: "/some/path",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2",
      },
    };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));

    linkParams = {
      route: "/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2",
      },
    };
    expect(stringify(linkParams)).toEqual(stringifyAmp(linkParams));
  });
});
