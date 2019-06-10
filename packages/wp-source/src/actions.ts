import WpSource from "../";
import { parse, normalize } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async link => {
    const { source } = state;
    const { resolver } = libraries.source;

    // Get route and route params
    const route = normalize(link);
    const routeParams = parse(link);

    // Get current data object
    const data = source.data[route];

    // return if the data that it's about to be fetched already exists
    if (data) return;

    // init data
    source.data[route] = {
      isReady: false,
      isFetching: true
    };

    // get and execute the corresponding handler based on path
    try {
      const { handler, params } = resolver.match(routeParams.path);
      await handler({ route, params, state, libraries });
      // everything OK
      source.data[route] = {
        ...source.data[route],
        isFetching: false,
        isReady: true
      };
    } catch (e) {
      // an error happened
      source.data[route] = {
        is404: true,
        isFetching: false,
        isReady: false
      };
    }
  },

  init: ({ state, libraries }) => {
    const { api, isWPCom } = state.source;

    libraries.source.api.init({ api, isWPCom });

    const patterns = isWPCom ? wpCom : wpOrg;
    patterns.forEach(({ pattern, handler }) =>
      libraries.source.resolver.addHandler({ pattern, handler })
    );

    // redirections:

    const { resolver } = libraries.source;
    const {
      wpDirectory,
      homepage,
      postsPage,
      categoryBase,
      tagBase
    } = state.source;

    console.log(wpDirectory);

    if (homepage) {
      const pattern = buildPath(wpDirectory);
      resolver.addRedirect({ pattern, redirect: () => buildPath(homepage) });
    }

    if (postsPage) {
      const pattern = buildPath(wpDirectory, postsPage);
      resolver.addRedirect({ pattern, redirect: () => "/" });
    }

    if (categoryBase) {
      // add new direction
      const pattern = buildPath(wpDirectory, categoryBase, "/:subpath+");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath }) => `/category/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({
        pattern: buildPath(wpDirectory, "/category/(.*)/"),
        redirect: () => ""
      });
    }

    if (tagBase) {
      // add new direction
      const pattern = buildPath(wpDirectory, tagBase, "/:subpath+");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath }) => `/tag/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({
        pattern: buildPath(wpDirectory, "/tag/(.*)/"),
        redirect: () => ""
      });
    }

    if (wpDirectory) {
      // add new direction
      const pattern = buildPath(wpDirectory, "/:subpath+");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath }) => `/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({ pattern: "/(.*)", redirect: () => "" });
    }
  }
};

const buildPath = (...paths: string[]) =>
  [""]
    .concat(...paths.map(path => path.split("/").filter(p => p)), "")
    .join("/");

export default actions;
