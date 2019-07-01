import WpSource from "../";
import { parse, normalize, concatPath } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";
import { getMatch } from "./libraries/get-match";
import { redirect } from "./libraries/redirect";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async link => {
    const { source } = state;

    const { handlers, redirections } = libraries.source;

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
      // transform path if there is some redirection
      let { path } = routeParams;
      path = redirect(path, redirections);

      // get the handler for this path
      const handler = getMatch(path, handlers);
      if (!handler) throw new Error(`No matching handler for route "${route}"`);

      await handler.func({ route, params: handler.params, state, libraries });
      // everything OK
      source.data[route] = {
        ...source.data[route],
        isFetching: false,
        isReady: true
      };
    } catch (e) {
      console.log(e);
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

    // handlers & redirections:
    const { handlers, redirections } = libraries.source;

    const patterns = isWpCom ? wpCom : wpOrg;
    handlers.push(...patterns);

    const {
      subdirectory,
      homepage,
      postsPage,
      categoryBase,
      tagBase
    } = state.source;

    if (subdirectory) {
      const pattern = concatPath(subdirectory, "/:subpath*");
      redirections.push({
        name: "subdirectory",
        priority: 10,
        pattern,
        func: ({ subpath }) => (subpath ? `/${subpath}/` : "/")
      });
      redirections.push({
        name: "ignore root",
        priority: 10,
        pattern: "/(.*)",
        func: () => ""
      });
    }

    if (homepage) {
      const pattern = "/";
      redirections.push({
        name: "homepage",
        priority: 20,
        pattern,
        func: () => concatPath(homepage)
      });
    }

    if (postsPage) {
      const pattern = concatPath(postsPage);
      redirections.push({
        name: "posts page",
        priority: 20,
        pattern,
        func: () => "/"
      });
    }

    if (categoryBase) {
      // add new direction
      const pattern = concatPath(categoryBase, "/:subpath+");
      redirections.push({
        name: "category base",
        priority: 20,
        pattern,
        func: ({ subpath }) => `/category/${subpath}/`
      });
      // remove old direction
      redirections.push({
        name: "ignore default category base",
        priority: 20,
        pattern: concatPath("/category/(.*)/"),
        func: () => ""
      });
    }

    if (tagBase) {
      // add new direction
      const pattern = concatPath(tagBase, "/:subpath+");
      redirections.push({
        name: "tag base",
        priority: 20,
        pattern,
        func: ({ subpath }) => `/tag/${subpath}/`
      });
      // remove old direction
      redirections.push({
        name: "ignore default tag base",
        priority: 20,
        pattern: concatPath("/tag/(.*)/"),
        func: () => ""
      });
    }
  }
};
export default actions;
