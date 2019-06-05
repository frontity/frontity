import WpSource from "../";
import { parse, normalize } from "./libraries/route-utils";
import { wpOrg, wpCom } from "./libraries/patterns";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async link => {
    const { source } = state;
    const { resolver } = libraries.source;

    // Get route and route params
    const route = normalize(link);
    const routeParams = parse(link);

    // Get current data object
    const data = source.data[route];

    // return if the data that it's about to be fetched already exists
    if (data) return;

    // init data
    source.data[route] = {
      isReady: false,
      isFetching: true
    };

    // get and execute the corresponding handler based on path
    try {
      const { handler, params } = resolver.match(routeParams.path);
      await handler(source, { route, params, libraries });
      source.data[route].isReady = true;
    } catch (e) {
      console.warn(`An error ocurred fetching '${route}':\n`, e);
      source.data[route].is404 = true;
    }

    // end fetching
    source.data[route].isFetching = false;
  },

  init: ({ state, libraries }) => {
    const { apiUrl, isWPCom } = state.source;
    const { api, resolver } = libraries.source;

    api.init({ apiUrl, isWPCom });

    const patterns = isWPCom ? wpCom : wpOrg;
    patterns.forEach(({ pattern, handler }) => resolver.add(pattern, handler));
  }
};

export default actions;
