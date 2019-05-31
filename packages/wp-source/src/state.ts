import WpSource from "..";
import { normalize, paramsToRoute } from "./libraries/routeUtils";

const state: WpSource["state"]["source"] = {
  get: ({ state }) => routeOrObj => {
    const dataPath =
      typeof routeOrObj === "string"
        ? normalize(routeOrObj)
        : paramsToRoute(routeOrObj);

    return state.source.data[dataPath] || {};
  },
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
