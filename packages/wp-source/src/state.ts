import WpSource from "..";
import { stringify } from "./libraries/route-utils";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => routeOrParams =>
    state.source.data[stringify(routeOrParams)] || {},
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
