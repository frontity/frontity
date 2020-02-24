import { URL, error } from "frontity";
import WpSource from "../types";
import { parse, normalize, concatPath } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";
import { getMatch } from "./libraries/get-match";
import {
  postTypeHandler,
  postTypeArchiveHandler,
  taxonomyHandler
} from "./libraries/handlers";
import { ErrorData } from "@frontity/source/types/data";
import { ServerError } from "@frontity/source";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async (link, options?) => {
    const { source } = state;

    const { handlers, redirections } = libraries.source;

    // Get route and route params
    const route = normalize(link);
    const routeParams = parse(link);

    // Get current data object
    const data = source.data[route];

    // Get options
    const force = options ? options.force : false;

    if (!data || force) {
      source.data[route] = {
        isReady: false,
        isFetching: false
      };
    } else if (data.isReady || data.isFetching || data.isError) {
      return;
    }

    source.data[route].isFetching = true;

    // get and execute the corresponding handler based on path
    try {
      let { path } = routeParams;
      // check if this is the homepage URL
      const isHome = path === normalize(state.source.subdirectory || "/");
      // transform path if there is some redirection
      const redirection = getMatch(path, redirections);
      if (redirection) path = redirection.func(redirection.params);

      // get the handler for this path
      const handler = getMatch(path, handlers);
      await handler.func({
        route,
        params: handler.params,
        state,
        libraries,
        force
      });
      // everything OK
      source.data[route] = {
        ...source.data[route],
        isFetching: false,
        isReady: true
      };
      // set isHome value if it's true
      if (isHome) source.data[route].isHome = true;
    } catch (e) {
      // It's a server error (4xx or 5xx)
      if (e instanceof ServerError) {
        console.error(e);

        const errorData: ErrorData = {
          isError: true,
          isReady: true,
          isFetching: false,
          [`is${e.status}`]: true,
          errorStatus: e.status,
          errorStatusText: e.statusText
        };
        source.data[route] = errorData;
      } else {
        throw e;
      }
    }
  },

  init: ({ state, libraries }) => {
    const { api, isWpCom } = state.source;

    try {
      new URL(api);
    } catch (e) {
      error("Add the URL of your WordPress REST API in state.source.api.");
    }

    libraries.source.api.init({ api, isWpCom });

    // handlers & redirections:
    const { handlers, redirections } = libraries.source;

    const patterns = isWpCom ? wpCom : wpOrg;
    handlers.push(...patterns);

    // Add handlers for custom post types
    state.source.postTypes.forEach(({ type, endpoint, archive }) => {
      // Single page
      handlers.push({
        name: type,
        priority: 10,
        pattern: concatPath(type, "/:slug"),
        func: postTypeHandler({ endpoints: [endpoint] })
      });
      // Archive
      if (archive)
        handlers.push({
          name: `${type} archive`,
          priority: 10,
          pattern: concatPath(archive),
          func: postTypeArchiveHandler({ type, endpoint })
        });
    });

    // Add handlers for custom taxonomies
    state.source.taxonomies.forEach(
      ({ taxonomy, endpoint, postTypeEndpoint, params }) => {
        handlers.push({
          name: taxonomy,
          priority: 10,
          pattern: concatPath(taxonomy, "/(.*)?/:slug"),
          func: taxonomyHandler({
            taxonomy,
            endpoint,
            postTypeEndpoint,
            params
          })
        });
      }
    );

    const {
      subdirectory,
      homepage,
      postsPage,
      categoryBase,
      tagBase
    } = state.source;

    if (homepage) {
      const pattern = concatPath(subdirectory);
      redirections.push({
        name: "homepage",
        priority: 10,
        pattern,
        func: () => concatPath(homepage)
      });
    }

    if (postsPage) {
      const pattern = concatPath(subdirectory, postsPage);
      redirections.push({
        name: "posts page",
        priority: 10,
        pattern,
        func: () => "/"
      });
    }

    if (categoryBase) {
      // add new direction
      const pattern = concatPath(subdirectory, categoryBase, "/:subpath+");
      redirections.push({
        name: "category base",
        priority: 10,
        pattern,
        func: ({ subpath }) => `/category/${subpath}/`
      });
      // remove old direction
      redirections.push({
        name: "category base (reverse)",
        priority: 10,
        pattern: concatPath(subdirectory, "/category/(.*)/"),
        func: () => ""
      });
    }

    if (tagBase) {
      // add new direction
      const pattern = concatPath(subdirectory, tagBase, "/:subpath+");
      redirections.push({
        name: "tag base",
        priority: 10,
        pattern,
        func: ({ subpath }) => `/tag/${subpath}/`
      });
      // remove old direction
      redirections.push({
        name: "tag base (reverse)",
        priority: 10,
        pattern: concatPath(subdirectory, "/tag/(.*)/"),
        func: () => ""
      });
    }

    if (subdirectory) {
      // add new direction
      const pattern = concatPath(subdirectory, "/:subpath*");
      redirections.push({
        name: "subdirectory",
        priority: 10,
        pattern,
        func: ({ subpath = "" }) => `/${subpath}${subpath ? "/" : ""}`
      });
      // remove old direction
      redirections.push({
        name: "subdirectory (reverse)",
        priority: 10,
        pattern: "/(.*)",
        func: () => ""
      });
    }
  }
};
export default actions;
