import { error, batch } from "frontity";
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
import {
  is404Redirection,
  isEagerRedirection,
  fetchRedirection,
} from "./utils";
import pathToRegexp from "path-to-regexp";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async (...params) => {
    const [route, options] = params;
    const { source } = state;

    // Get route and route params.
    const link = normalize(route);
    const linkParams = parse(route);
    const { query, page } = linkParams;

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

    // Get and execute the corresponding handler based on path.
    try {
      let { route } = linkParams;
      // Transform route if there is some redirection.
      const redirection = getMatch(
        { route, link },
        libraries.source.redirections
      );

      // Create a variable that holds the value of the link that we will later
      // pass to the `getMatch()` function. If there is a redirection, we update
      // the value of `route`, so we'll have to later derive the link again
      // based on the "new" (redirected) route.
      let linkForHandler = link;
      if (redirection) {
        route = redirection.func(redirection.params);

        // Derive the link from the "redirected" route.
        linkForHandler = normalize(route);
      }

      // Check if we need to check if it is a 30X redirection before fetching
      // the backend.
      if (isEagerRedirection(state.source.redirections, link)) {
        const redirection = await fetchRedirection({ link, state });
        // If there is a redirection, populate the data object and finish here.
        if (redirection?.isRedirection) {
          batch(() => Object.assign(source.data[link], redirection));
          return;
        }
      }

      // Get the handler for this route.
      const handler = getMatch(
        { route, link: linkForHandler },
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

      // Mark the data object as ready.
      // TODO: We should remove data.isHome to the handlers in Source v2.
      batch(() =>
        Object.assign(source.data[link], {
          ...(isHome && { isHome: true }),
          isFetching: false,
          isReady: true,
        })
      );
    } catch (error) {
      // If it's NOT a server error (4xx or 5xx) it means it is an error in the
      // code, so we should throw.
      if (error.name !== "ServerError") {
        throw error;
      }

      // Check it there is a 301 redirection stored in the backend.
      if (error.status === 404 && is404Redirection(state.source.redirections)) {
        const redirection = await fetchRedirection({ link, state });
        // If there is a redirection, populate the data object and finish here.
        if (redirection?.isRedirection) {
          batch(() => Object.assign(source.data[link], redirection));
          return;
        }
      }

      const errorData: ErrorData = {
        isError: true,
        isReady: true,
        isFetching: false,
        [`is${error.status}`]: true,
        errorStatus: error.status,
        errorStatusText: error.statusText,
        route: linkParams.route,
        link,
        query,
        page,
      };
      source.data[link] = errorData;
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
        pattern: concatLink(type, "/(.*)?/:slug"),
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

    // The redirection for AMP
    redirections.push({
      name: "amp",
      priority: 1,
      pattern: ":link(.*)/amp",
      func: ({ link: linkWithoutAMP }) => {
        /**
         * Match stuff.
         *
         * @param path - Path.
         * @param link - Link.
         *
         * @returns If there is a match.
         */
        const match = (path: string, link: string) =>
          pathToRegexp(path).test(link);

        const fullLink = `${linkWithoutAMP}/amp`;

        // `/amp` page
        if (fullLink === "/amp") return fullLink;

        // category
        let pattern = concatLink(subdirectory, categoryBase);
        if (match(pattern, linkWithoutAMP)) return fullLink;
        if (match("/category/(.*)?/:slug", fullLink)) return fullLink;

        // author
        pattern = concatLink(subdirectory, authorBase);
        if (match(pattern, linkWithoutAMP)) return fullLink;
        if (match("/author/:slug", fullLink)) return fullLink;

        // tag
        pattern = concatLink(subdirectory, tagBase);
        if (match(pattern, linkWithoutAMP)) return fullLink;
        if (match("/tag/:slug", fullLink)) return fullLink;

        // handle custom post types
        if (state.source.postTypes.some(({ type }) => type === "amp")) {
          return fullLink;
        }

        // handle custom taxonomies
        // TODO: ...

        return linkWithoutAMP;
      },
    });

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
