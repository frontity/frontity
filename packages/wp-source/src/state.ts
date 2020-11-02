import { error } from "frontity";
import WpSource from "../types";
import { addFinalSlash, normalize, parse } from "./libraries/route-utils";

const state: WpSource["state"]["source"] = {
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
    // Get the data object pointed by `link`.
    const data = state.source.get(link);

    // Initialize entity as `null` (it is possible that data doesn't point to an
    // entity, e.g. a date archive or a 404 page).
    let entity: any = null;

    // Entities are stored in different places depending on their type.
    if (data.isPostType) {
      const { type, id } = data;
      entity = state.source[type][id];
    } else if (data.isTaxonomy) {
      const { taxonomy, id } = data;
      entity = state.source[taxonomy][id];
    } else if (data.isAuthor) {
      const { id } = data;
      entity = state.source.author[id];
    } else if (data.isPostTypeArchive) {
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
  // Keep backward compatibility when `state.source.api` is not
  // overwritten in frontity.settings.js.
  api: ({ state }) => {
    // Check if it's a free WordPress.com site.
    if (/^https:\/\/(\w+\.)?wordpress\.com/.test(state.source.url))
      return addFinalSlash(
        `https://public-api.wordpress.com/wp/v2/sites/${state.source.url}`
      );

    return addFinalSlash(
      addFinalSlash(state.source.url) + state.wpSource.prefix.replace(/^\//, "")
    );
  },
  isWpCom: ({ state }) =>
    state.source.api.startsWith(
      "https://public-api.wordpress.com/wp/v2/sites/"
    ),
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
  url: ({ state }) => {
    if (!state.frontity?.url)
      error(
        "Please set either `state.source.url` (or at least `state.frontity.url` if you are using Embedded mode) in your frontity.settings.js file."
      );
    return addFinalSlash(state.frontity.url);
  },
};

export default state;
