import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const pageHandler: Handler = async ({ route, params, state, libraries }) => {
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(state.source.page, slug);

  // Get page from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: "pages",
      params: { slug, _embed: true }
    });

    const populated = await populate({ response, state });

    if (populated.length === 0)
      throw new Error(`page with slug "${slug}" not found`);

    [{ id }] = populated;
  }

  // Init data
  Object.assign(state.source.data[route], {
    id,
    type: "page",
    isPostType: true,
    isPage: true
  });
};

export default pageHandler;
