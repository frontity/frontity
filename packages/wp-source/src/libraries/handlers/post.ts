import { Handler } from "../../..";
import getIdBySlug from "./utils/get-id-by-slug";

const postHandler: Handler = async (source, { route, params, libraries }) => {
  const { api, populate } = libraries.source;

  const { slug } = params;
  let id = getIdBySlug(source.post, slug);

  // Get post from REST API if not found
  if (!id) {
    const response = await api.get({
      endpoint: "posts",
      params: { slug, _embed: true }
    });

    const populated = await populate(source, response);

    if (!populated.length)
      throw new Error(`Post with slug "${slug}" not found.`);

    [{ id }] = populated;
  }

  // Init data
  Object.assign(source.data[route], {
    id,
    type: "post",
    isPostType: true,
    isPost: true
  });
};

export default postHandler;
