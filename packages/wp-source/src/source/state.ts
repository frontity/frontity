import normalizePath from "./utils/normalize-path";
import WpSource from "../type";

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
