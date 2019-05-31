import WpSource from "../";
import { routeToParams, paramsToRoute } from "./libraries/routeUtils";
import { wpOrg, wpCom } from "./libraries/patterns";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async routeOrParams => {
    const { source } = state;
    const { resolver } = libraries.source;

    // Get params
    const routeParams =
      typeof routeOrParams === "string"
        ? routeToParams(routeOrParams)
        : routeOrParams;

    // Get route from params
    const route = paramsToRoute(routeParams);

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
