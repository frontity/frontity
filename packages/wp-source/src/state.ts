import WpSource from "..";
import { normalize } from "./libraries/route-utils";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => link => state.source.data[normalize(link)] || {},
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
