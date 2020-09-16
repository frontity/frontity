import { error } from "frontity";
import WpSource from "../types";
import { parse, normalize, concatPath } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";
import { getMatch } from "./libraries/get-match";
import {
  postTypeHandler,
  postTypeArchiveHandler,
  taxonomyHandler,
} from "./libraries/handlers";
import { ErrorData } from "@frontity/source/types/data";
import { ServerError } from "@frontity/source";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async (...params) => {
    const [route, options] = params;
    const { source } = state;

    const { handlers, redirections } = libraries.source;

    // Get route and route params
    const link = normalize(route);
    const linkParams = parse(route);
    const { query, page } = linkParams;

    // Get current data object
    const data = source.data[link];

    // Get options
    const force = options ? options.force : false;

    if (!data) {
      // If there is no data yet, just set the necessary flags:
      source.data[link] = {
        isFetching: true,
        isReady: false,
      };
    } else if (force) {
      // If we fetch with `{ force: true }`, then only set `isFetching` to true again
      data.isFetching = true;

      // This is a workaround in case that `data` has previously included an error
      if (data.isError) {
        source.data[link] = {
          isFetching: true,
          isReady: false,
        };
      }
    } else if ((data.isReady && !force) || data.isFetching || data.isError) {
      // Always set link, route, query & page
      data.link = link;
      data.route = linkParams.route;
      data.query = query;
      data.page = page;
      return;
    }

    // Always set the page
    source.data[link].page = page;

    // Make sure isFetching is true before starting the fetch.
    source.data[link].isFetching = true;

    // Get and execute the corresponding handler based on path.
    try {
      let { route } = linkParams;
      // Check if this is the homepage URL.
      const isHome = route === normalize(state.source.subdirectory || "/");

      // Transform route if there is some redirection.
      const redirection = getMatch(route, redirections);
      if (redirection) route = redirection.func(redirection.params);

      // Get the handler for this route.
      const handler = getMatch(route, handlers);
      await handler.func({
        link,
        route: link,
        params: handler.params,
        state,
        libraries,
        force,
      });
      // Everything OK.
      source.data[link] = {
        ...source.data[link],
        ...(isHome && { isHome: true }),
        isFetching: false,
        isReady: true,
      };
    } catch (e) {
      // It's a server error (4xx or 5xx).
      if (e instanceof ServerError) {
        console.error(e);

        const errorData: ErrorData = {
          isError: true,
          isReady: true,
          isFetching: false,
          [`is${e.status}`]: true,
          errorStatus: e.status,
          errorStatusText: e.statusText,
        };
        source.data[link] = errorData;
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

    // Handlers & redirections.
    const { handlers, redirections } = libraries.source;

    const patterns = isWpCom ? wpCom : wpOrg;
    handlers.push(...patterns);

    // Add handlers for custom post types.
    state.source.postTypes.forEach(({ type, endpoint, archive }) => {
      // Single page
      handlers.push({
        name: type,
        priority: 10,
        pattern: concatPath(type, "/:slug"),
        func: postTypeHandler({ endpoints: [endpoint] }),
      });
      // Archive.
      if (archive)
        handlers.push({
          name: `${type} archive`,
          priority: 10,
          pattern: concatPath(archive),
          func: postTypeArchiveHandler({ type, endpoint }),
        });
    });

    // Add handlers for custom taxonomies.
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
            params,
          }),
        });
      }
    );

    const {
      subdirectory,
      homepage,
      postsPage,
      categoryBase,
      tagBase,
      authorBase,
    } = state.source;

    if (homepage) {
      const pattern = concatPath(subdirectory);
      redirections.push({
        name: "homepage",
        priority: 10,
        pattern,
        func: () => concatPath(homepage),
      });
    }

    if (postsPage) {
      const pattern = concatPath(subdirectory, postsPage);
      redirections.push({
        name: "posts page",
        priority: 10,
        pattern,
        func: () => "/",
      });
    }

    if (categoryBase) {
      // Add new direction.
      const pattern = concatPath(subdirectory, categoryBase, "/:subpath+");
      redirections.push({
        name: "category base",
        priority: 10,
        pattern,
        func: ({ subpath }) => `/category/${subpath}/`,
      });
      // Remove old direction.
      redirections.push({
        name: "category base (reverse)",
        priority: 10,
        pattern: concatPath(subdirectory, "/category/(.*)/"),
        func: () => "",
      });
    }

    if (tagBase) {
      // Add new direction.
      const pattern = concatPath(subdirectory, tagBase, "/:subpath+");
      redirections.push({
        name: "tag base",
        priority: 10,
        pattern,
        func: ({ subpath }) => `/tag/${subpath}/`,
      });
      // Remove old direction.
      redirections.push({
        name: "tag base (reverse)",
        priority: 10,
        pattern: concatPath(subdirectory, "/tag/(.*)/"),
        func: () => "",
      });
    }

    if (authorBase) {
      // Add new direction.
      const pattern = concatPath(subdirectory, authorBase, "/:subpath+");
      redirections.push({
        name: "author base",
        priority: 10,
        pattern,
        func: ({ subpath }) => `/author/${subpath}/`,
      });
      // Remove old direction.
      redirections.push({
        name: "author base (reverse)",
        priority: 10,
        pattern: concatPath(subdirectory, "/author/(.*)/"),
        func: () => "",
      });
    }

    if (subdirectory) {
      // Add new direction.
      const pattern = concatPath(subdirectory, "/:subpath*");
      redirections.push({
        name: "subdirectory",
        priority: 10,
        pattern,
        func: ({ subpath = "" }) => `/${subpath}${subpath ? "/" : ""}`,
      });
      // Remove old direction.
      redirections.push({
        name: "subdirectory (reverse)",
        priority: 10,
        pattern: "/(.*)",
        func: () => "",
      });
    }
  },
};
export default actions;
