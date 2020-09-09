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

    // The non-URL resources start with `@` by convention. In that case,
    // it makes no sense to add the `link`, `route` and `query`
    if (link.startsWith("@")) {
      return {
        page,
        isFetching: false,
        isReady: false,
      };
    }

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
};

export default state;
