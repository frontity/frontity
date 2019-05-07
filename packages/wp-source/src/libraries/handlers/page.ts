import { Handler } from "../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const pageHandler: Handler = async (state, { path, params, libraries }) => {
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(state.page, slug);

  // Get page from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    // the next line will fail if page with id doesn't exist
    [{ id }] = await populate(state, response);
  }

  // Init data
  state.dataMap[path] = {
    id,
    type: "page",
    isPostType: true,
    isPage: true,
    isFetching: true,
  };
};

export default pageHandler;
