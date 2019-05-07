import normalizePath from "./utils/normalize-path";
import WpSource from "../types";

const state: WpSource["state"]["source"] = {
  data: state => pathOrLink => state.source.dataMap[normalizePath(pathOrLink)],
  dataMap: {},
  category: {},
  tag: {},
  post: {},
  page: {},
  author: {},
  attachment: {}
};

export default state;
