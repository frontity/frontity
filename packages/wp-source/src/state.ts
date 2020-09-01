import WpSource from "../types";
import { normalize, parse } from "./libraries/route-utils";

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
  handledQueries: {
    p: true,
  },
};

export default state;
