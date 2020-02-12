import WpSource from "../types";
import { normalize } from "./libraries/route-utils";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => link =>
    state.source.data[normalize(link)] || {
      isFetching: false,
      isReady: false
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
  postEndpoint: "posts",
  params: {},
  postTypes: [],
  taxonomies: []
};

export default state;
