import { State, PathOrObj, Libraries } from "../type";
import normalizePath from "./utils/normalize-path";
import wpOrg from "../libraries/patterns/wp-org";
import wpCom from "../libraries/patterns/wp-com";

const actions = ({ libraries }: { libraries: Libraries }) => ({
  fetch: (state: State) => async (pathOrObj: PathOrObj) => {
    const { source } = state;
    const { resolver } = libraries.source;

    let { path, page = 1 } =
      typeof pathOrObj === "object" ? pathOrObj : { path: pathOrObj };

    // transform whole links to paths
    path = normalizePath(path);

    // Get current data object
    const data = source.dataMap[path];

    // return if the data that it's about to be fetched already exists
    if (data && page && data.isArchive && data.pages[page]) return;

    // init data if needed
    if (!data) source.dataMap[path] = {};

    // get and execute the corresponding handler based on path
    try {
      const { handler, params } = resolver.match(path);
      await handler(source, { path, params, page, libraries });
      source.dataMap[path].isReady = true;
    } catch (e) {
      console.warn(`An error ocurred fetching '${path}:'\n`, e);
      source.dataMap[path].is404 = true;
    }

    // end fetching
    source.dataMap[path].isFetching = false;
  },

  init: (state: State) => {
    const { apiUrl, isCom } = state.settings.source;
    const { api, resolver } = libraries.source;

    api.init({ apiUrl, isCom });

    const patterns = isCom ? wpCom : wpOrg;
    patterns.forEach(({ pattern, handler }) => resolver.add(pattern, handler));
  }
});

export default actions;
