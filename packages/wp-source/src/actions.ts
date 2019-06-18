import WpSource from "../";
import { parse, normalize, concatPath } from "./libraries/route-utils";
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
    const { api, isWpCom } = state.source;

    libraries.source.api.init({ api, isWpCom });

    const patterns = isWpCom ? wpCom : wpOrg;
    patterns.forEach(({ pattern, handler }) =>
      libraries.source.resolver.addHandler({ pattern, handler })
    );

    // redirections:

    const { resolver } = libraries.source;
    const {
      subdirectory,
      homepage,
      postsPage,
      categoryBase,
      tagBase
    } = state.source;

    if (homepage) {
      const pattern = concatPath(subdirectory);
      resolver.addRedirect({ pattern, redirect: () => concatPath(homepage) });
    }

    if (postsPage) {
      const pattern = concatPath(subdirectory, postsPage);
      resolver.addRedirect({ pattern, redirect: () => "/" });
    }

    if (categoryBase) {
      // add new direction
      const pattern = concatPath(subdirectory, categoryBase, "/:subpath+");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath }) => `/category/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({
        pattern: concatPath(subdirectory, "/category/(.*)/"),
        redirect: () => ""
      });
    }

    if (tagBase) {
      // add new direction
      const pattern = concatPath(subdirectory, tagBase, "/:subpath+");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath }) => `/tag/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({
        pattern: concatPath(subdirectory, "/tag/(.*)/"),
        redirect: () => ""
      });
    }

    if (subdirectory) {
      // add new direction
      const pattern = concatPath(subdirectory, "/:subpath*");
      resolver.addRedirect({
        pattern,
        redirect: ({ subpath = "" }) => `/${subpath}`
      });
      // remove old direction
      resolver.addRedirect({ pattern: "/(.*)", redirect: () => "" });
    }
  }
};
export default actions;
