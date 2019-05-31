import WpSource from "..";
import { parsePath } from "./utils/parse-path";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => pathOrLink =>
    state.source.data[parsePath(pathOrLink).path] || {},
  data: {},
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
