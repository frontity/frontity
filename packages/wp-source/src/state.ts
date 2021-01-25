import { warn, error, isDerived } from "frontity";
import WpSource from "../types";
import { addFinalSlash, normalize, parse } from "./libraries/route-utils";
import {
  isPostType,
  isTerm,
  isAuthor,
  isPostTypeArchive,
} from "@frontity/source";

const state: WpSource["state"] = {
  source: {
    get: ({ state }) => (link) => {
      const normalizedLink = normalize(link);
      const data = state.source.data[normalizedLink];
      if (data) {
        return data;
      }
      const { route, query, page } = parse(link);

      return {
        link: normalize(normalizedLink),
        route,
        query,
        page,
        isFetching: false,
        isReady: false,
      };
    },
    entity: ({ state }) => (link) => {
      warn(
        "`state.source.entity(link)` is deprecated. Please, use the props " +
          "included in the data returned by `state.source.get(link)` to access " +
          "entities directly. This function will be removed in a future " +
          "version of `@frontity/wp-source`."
      );

      // Get the data object pointed by `link`.
      const data = state.source.get(link);

      // Initialize entity as `null` (it is possible that data doesn't point to an
      // entity, e.g. a date archive or a 404 page).
      let entity: any = null;

      // Entities are stored in different places depending on their type.
      if (isPostType(data)) {
        const { type, id } = data;
        entity = state.source[type][id];
      } else if (isTerm(data)) {
        const { taxonomy, id } = data;
        entity = state.source[taxonomy][id];
      } else if (isAuthor(data)) {
        const { id } = data;
        entity = state.source.author[id];
      } else if (isPostTypeArchive(data)) {
        const { type } = data;
        entity = state.source.type[type];
      }

      // It returns the entity found or `null` otherwise.
      return entity;
    },
    data: {},
    category: {},
    tag: {},
    post: {},
    page: {},
    author: {},
    attachment: {},
    type: {},
    taxonomy: {},
    subdirectory: "",
    homepage: "",
    postsPage: "",
    categoryBase: "",
    tagBase: "",
    authorBase: "",
    postEndpoint: "posts",
    params: {},
    postTypes: [],
    taxonomies: [],
    redirections: "no",

    // Make `state.source.url` to derived from `state.wpSource.api` and
    // `state.wpSource.isWpCom` if they are defined explicitly
    // in`frontity.settings.js`.
    url: ({ state }) => {
      // Check first if `api` should derive from `state.source.url`.
      if (isDerived(state.wpSource, "api") && isDerived(state.source, "api")) {
        // In this case, `state.source.url` should derive from
        // `state.frontity.url`.

        if (!state.frontity?.url)
          error(
            "Please set either `state.source.url` (or at least `state.frontity.url` if you are using Embedded mode) in your frontity.settings.js file."
          );

        return addFinalSlash(state.frontity.url);
      }

      // At this point, we know that `state.wpSource.api` was defined by the
      // user, so we check if the API points to a WP.org or a WP.com site and
      // extract the site URL appropriately.

      // For WP.com sites.
      if (state.wpSource.isWpCom)
        return addFinalSlash(
          state.wpSource.api.replace(
            /public-api\.wordpress\.com\/wp\/v2\/sites\//,
            ""
          )
        );

      // For WP.org sites.

      // Get the prefix and transform it to have only a slash at the beginning.
      const prefix = state.wpSource.prefix
        .replace(/^\/?/, "/")
        .replace(/\/$/, "");

      return addFinalSlash(state.wpSource.api.replace(prefix, ""));
    },

    // Just copy the value of `state.wpSource.api`.
    api: ({ state }) => state.wpSource.api,

    // Just copy the value of `state.wpSource.isWpCom`.
    isWpCom: ({ state }) => state.wpSource.isWpCom,
  },
  wpSource: {
    api: ({ state }) => {
      // Check first if `state.source.api` is overwritten. Return its value in
      // that case.
      if (!isDerived(state.source, "api")) return state.source.api;

      // Is it a WordPress.com site with a custom domain?
      const isCustomWpCom =
        !isDerived(state.wpSource, "isWpCom") && state.wpSource.isWpCom;

      // Is it a free WordPress.com site using a subdomain.wordpress.com domain?
      const isFreeWpCom = /^https:\/\/(\w+\.)?wordpress\.com/.test(
        state.source.url
      );

      if (isCustomWpCom || isFreeWpCom) {
        const { hostname } = new URL(state.source.url);
        return addFinalSlash(
          `https://public-api.wordpress.com/wp/v2/sites/${hostname}`
        );
      }

      return addFinalSlash(
        addFinalSlash(state.source.url) +
          state.wpSource.prefix.replace(/^\//, "")
      );
    },
    isWpCom: ({ state }) =>
      state.wpSource.api.startsWith(
        "https://public-api.wordpress.com/wp/v2/sites/"
      ),
    prefix: "/wp-json",
  },
};

export default state;
