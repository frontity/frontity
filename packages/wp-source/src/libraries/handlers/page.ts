import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const pageHandler: Handler = async ({ route, params, state, libraries }) => {
  const { source } = state;
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(source.page, slug);

  // Get page from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    // the next line will fail if page with id doesn't exist
    [{ id }] = await populate({ response, state });
  }

  // Init data
  Object.assign(source.data[route], {
    id,
    type: "page",
    isPostType: true,
    isPage: true
  });
};

export default pageHandler;
