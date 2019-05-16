import WpSource from "..";
import { parsePath } from "./utils/parse-path";

const state: WpSource["state"]["source"] = {
  data: ({ state }) => pathOrLink =>
    state.source.dataMap[parsePath(pathOrLink).path] || {},
  dataMap: {},
  category: {},
  tag: {},
  post: {},
  page: {},
  author: {},
  attachment: {},
  apiUrl: "https://test.frontity.io",
  isWPCom: false
};

export default state;
