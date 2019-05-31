import WpSource from "../";
import { routeToParams } from "./libraries/routeUtils";
import { wpOrg, wpCom } from "./libraries/patterns";

const actions: WpSource["actions"]["source"] = {
  fetch: ({ state, libraries }) => async routeOrParams => {
    const { source } = state;
    const { resolver } = libraries.source;

    let path: string;
    let page: number;

    if (typeof routeOrParams === "string") {
      ({ path, page } = routeToParams(routeOrParams));
    } else {
      ({ path, page } = routeToParams(routeOrParams.path));
      if (routeOrParams.page) page = routeOrParams.page;
    }

    // Get current data object
    const data = source.data[path];

    // return if the data that it's about to be fetched already exists
    if (data && data.isArchive && data.pages[page]) return;

    // init data if needed
    if (!data) source.data[path] = {};

    // get and execute the corresponding handler based on path
    try {
      const { handler, params } = resolver.match(path);
      await handler(source, { path, params, page, libraries });
      source.data[path].isReady = true;
    } catch (e) {
      console.warn(`An error ocurred fetching '${path}':\n`, e);
      source.data[path].is404 = true;
    }

    // end fetching
    source.data[path].isFetching = false;
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
