import WpSource from "..";
import { stringify } from "./libraries/route-utils";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => link => state.source.data[stringify(link)] || {},
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
