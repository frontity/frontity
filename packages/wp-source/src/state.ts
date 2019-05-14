import WpSource from "..";
import normalizePath from "./utils/normalize-path";

const state: WpSource["state"]["source"] = {
  data: ({ state }) => pathOrLink =>
    state.source.dataMap[normalizePath(pathOrLink)],
  dataMap: {},
  category: {},
  tag: {},
  post: {},
  page: {},
  author: {},
  attachment: {},
  apiUrl: "https://test.frontity.io",
  isCom: false
};

export default state;
