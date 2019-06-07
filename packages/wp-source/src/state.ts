import WpSource from "..";
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
  api: "https://test.frontity.io",
  isWPCom: false,
  wpDirectory: "",
  homepage: "",
  postsPage: "",
  categoryBase: "",
  tagBase: ""
};

export default state;
