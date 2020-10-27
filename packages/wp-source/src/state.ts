import WpSource from "../types";
import { normalize, parse } from "./libraries/route-utils";
import {
  isPostType,
  isTerm,
  isAuthor,
  isPostTypeArchive,
} from "@frontity/source";

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
  api: "",
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
};

export default state;
