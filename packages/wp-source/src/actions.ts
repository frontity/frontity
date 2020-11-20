import { error, fetch } from "frontity";
import WpSource from "../types";
import { parse, normalize, concatLink } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";
import { getMatch } from "./libraries/get-match";
import {
  postTypeHandler,
  postTypeArchiveHandler,
  postTypeWithQueryHandler,
  taxonomyHandler,
} from "./libraries/handlers";
import { ErrorData } from "@frontity/source/types/data";
import { ServerError, isError, isSearch } from "@frontity/source";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async (...params) => {
    const [route, options] = params;
    const { source } = state;

    // Get route and route params.
    const link = normalize(route);
    const linkParams = parse(route);
    const { query, page, queryString } = linkParams;

    // Get options.
    const force = options ? options.force : false;

    // Get current data object.
    let data = source.data[link];

    // Initialize `data` if it does not exist yet. Also, reinitialize it only in
    // the case `data` is an error and `{ force: true }` is used.
    if (!data || (force && isError(data))) {
      data = source.data[link] = {
        isFetching: true,
        isReady: false,
        route: linkParams.route,
        link,
        query,
        page,
      };
    } else {
      // Reassign `route`, `link`, `query`, `page` to fix custom handlers that
      // do not add them.
      Object.assign(data, {
        route: linkParams.route,
        link,
        query,
        page,
      });
      // Stop fetching if data is ready or being fetched and `{ force: true }`
      // is not used.
      if (!force && (data.isReady || data.isFetching)) return;

      // Reached this point, make sure `isFetching` is true.
      data.isFetching = true;
    }

    // Always set link, route, query & page
    source.data[link].link = link;
    source.data[link].route = linkParams.route;
    source.data[link].query = query;
    source.data[link].page = page;

    // Make sure isFetching is true before starting the fetch.
    source.data[link].isFetching = true;

    let redirectionPromise: Promise<Response>;

    // Get and execute the corresponding handler based on path.
    try {
      let { route } = linkParams;
      // Transform route if there is some redirection.
      const redirection = getMatch(route, libraries.source.redirections);
      if (redirection) route = redirection.func(redirection.params);

      // These are different from the "redirections" above - this setting is
      // used for handling 30x redirections that can be stored in the WordPress database.
      const { redirections } = state.source;

      // The router redirections can be an array.
      if (Array.isArray(redirections)) {
        const patterns = redirections
          .filter((r) => r.startsWith("RegExp:"))
          .map((r) => r.replace(/^RegExp:/, ""));

        if (patterns.some((r) => route.match(r))) {
          redirectionPromise = fetch(state.source.url + link, {
            method: "HEAD",
          });
        }
        // Or it can be "all".
      } else if (redirections === "all") {
        redirectionPromise = fetch(state.source.url + link, { method: "HEAD" });
        // Or it can be just a regex or null/undefined (so we use the optional chaining)
      } else if (redirections?.startsWith("RegExp:")) {
        const regex = redirections.replace(/^RegExp:/, "");
        if (link.match(regex)) {
          redirectionPromise = fetch(state.source.url + link, {
            method: "HEAD",
          });
        }
      }

      // Get the handler for this route.
      const handler = getMatch(
        `${route}${queryString}`,
        libraries.source.handlers
      );

      // Return a 404 error if no handler has matched.
      if (!handler)
        throw new ServerError(
          `No handler has matched for the given link: "${link}"`,
          404
        );

      // Execute the handler.
      await handler.func({
        link,
        // This `route` parameter does not match `data.route`. It is the name
        // given to `link` prior to @frontity/wp-source@1.6.0.
        route: link,
        params: handler.params,
        state,
        libraries,
        force,
      });

      // Check if this is the homepage URL if it is either the root "/" or the
      // subdirectory "/folder/", but only in the case that it is not a search
      // and the matched handler is not used to match for queries (the ones that
      // start with "RegExp:").
      const isHome =
        !handler.pattern.startsWith("RegExp:") &&
        isSearch(source.data[link]) !== true &&
        source.data[link].route === normalize(state.source.subdirectory || "/");

      // Populate the data object.
      Object.assign(source.data[link], {
        ...(isHome && { isHome: true }),
        isFetching: false,
        isReady: true,
      });
    } catch (e) {
      // It's a server error (4xx or 5xx).
      if (e instanceof ServerError) {
        // Check if the error is 4xx and we want to handle redirections in case
        // of an error.
        if (e.status === 404) {
          // If the route matched the redirection regex or
          // state.source.redirections === 'all', then we have already started
          // fetching the data, so just await it.
          let head = redirectionPromise && (await redirectionPromise);

          if (
            !head &&
            (state.source.redirections === "404" ||
              (Array.isArray(state.source.redirections) &&
                state.source.redirections.includes("404")))
          ) {
            try {
              head = await fetch(state.source.url + link, { method: "HEAD" });
            } catch (e) {
              // If there is no redirection, we ignore it and just continue
              // handling the 404 ServerError that was thrown previously.
            }
          }
          console.log(head);

          if (head?.redirected) {
            const { pathname, search, hash } = new URL(head.url);

            Object.assign(source.data[link], {
              location: pathname + search + hash,
              redirectionStatus: head.status,
              [`is${head.status}`]: true,
              isFetching: false,
              isReady: true,
              isRedirection: true,
            });
            return;
          }
        }

        console.error(e);

        const errorData: ErrorData = {
          isError: true,
          isReady: true,
          isFetching: false,
          [`is${e.status}`]: true,
          errorStatus: e.status,
          errorStatusText: e.statusText,
          route: linkParams.route,
          link,
          query,
          page,
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

    // If the URL contains an auth token, then add it to the state. This is
    // normally the case e.g, when accessing the post preview.
    const auth = state.frontity?.options?.sourceAuth;
    const authFromEnv = process.env.FRONTITY_SOURCE_AUTH;
    if (auth || authFromEnv) {
      state.source.auth = auth || authFromEnv;
    }

    // Handlers & redirections.
    const { handlers, redirections } = libraries.source;

    const patterns = isWpCom ? wpCom : wpOrg;
    handlers.push(...patterns);

    // Add handlers for custom post types.
    state.source.postTypes.forEach(({ type, endpoint, archive }) => {
      // Single page.
      handlers.push({
        name: type,
        priority: 10,
        pattern: concatLink(type, "/:slug"),
        func: postTypeHandler({ endpoints: [endpoint] }),
      });
      // Query permalink (mainly for drafts).
      handlers.push({
        name: `${type} with query permalink`,
        priority: 9,
        pattern: `RegExp:(\\?|&)p=\\d+&post_type=${type}`,
        func: postTypeWithQueryHandler({ type, endpoint }),
      });
      // Archive.
      if (archive)
        handlers.push({
          name: `${type} archive`,
          priority: 10,
          pattern: concatLink(archive),
          func: postTypeArchiveHandler({ type, endpoint }),
        });
    });

    // Add handlers for custom taxonomies.
    state.source.taxonomies.forEach(
      ({ taxonomy, endpoint, postTypeEndpoint, params }) => {
        handlers.push({
          name: taxonomy,
          priority: 10,
          pattern: concatLink(taxonomy, "/(.*)?/:slug"),
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
      const pattern = concatLink(subdirectory);
      redirections.push({
        name: "homepage",
        priority: 10,
        pattern,
        func: () => concatLink(homepage),
      });
    }

    if (postsPage) {
      const pattern = concatLink(subdirectory, postsPage);
      redirections.push({
        name: "posts page",
        priority: 10,
        pattern,
        func: () => "/",
      });
    }

    if (categoryBase) {
      // Add new direction.
      const pattern = concatLink(subdirectory, categoryBase, "/:subpath+");
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
        pattern: concatLink(subdirectory, "/category/(.*)/"),
        func: () => "",
      });
    }

    if (tagBase) {
      // Add new direction.
      const pattern = concatLink(subdirectory, tagBase, "/:subpath+");
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
        pattern: concatLink(subdirectory, "/tag/(.*)/"),
        func: () => "",
      });
    }

    if (authorBase) {
      // Add new direction.
      const pattern = concatLink(subdirectory, authorBase, "/:subpath+");
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
        pattern: concatLink(subdirectory, "/author/(.*)/"),
        func: () => "",
      });
    }

    if (subdirectory) {
      // Add new direction.
      const pattern = concatLink(subdirectory, "/:subpath*");
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

  afterSSR: ({ state }) => {
    // Remove the auth tokens that were used in the server.
    delete state.source.auth;
    delete state.frontity.options.sourceAuth;
  },
};
export default actions;
