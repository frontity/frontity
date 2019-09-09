import { Handler } from "../../../types";
import getIdBySlug from "./utils/get-id-by-slug";

const taxonomyHandler = ({
  taxonomy,
  postType,
  truths = {}
}: {
  taxonomy: { type: string; endpoint: string };
  postType: { endpoint?: string; param: string };
  props?: Record<string, string>;
  truths?: Record<string, true>;
}): Handler => async ({ route, params, state, libraries }) => {
  const { api, populate, parse, getTotal, getTotalPages } = libraries.source;
  const { page, query } = parse(route);

  // 1. search id in state or get it from WP REST API
  const { slug } = params;
  let id = getIdBySlug(state.source[taxonomy.type], slug);
  if (!id) {
    // Request entity from WP
    const { endpoint } = taxonomy;
    const response = await api.get({ endpoint, params: { slug } });
    const [entity] = await populate({ response, state });
    if (!entity)
      throw new Error(
        `entity from endpoint '${endpoint}' with slug '${slug}' not found`
      );
    id = entity.id;
  }

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: postType.endpoint || state.source.postEndpoint,
    params: {
      [postType.param]: id,
      search: query.s,
      page,
      _embed: true,
      ...state.source.params
    }
  });

  // 3. populate response and add page to data
  const items = await populate({ response, state });
  if (page > 1 && items.length === 0)
    throw new Error(
      `${taxonomy.type} with slug "${slug}" doesn't have page ${page}`
    );

  // 4. get posts and pages count
  const total = getTotal(response);
  const totalPages = getTotalPages(response);

  // 5. add data to source
  Object.assign(state.source.data[route], {
    taxonomy: taxonomy.type,
    id,
    items,
    total,
    totalPages,
    isArchive: true,
    isTaxonomy: true,
    ...truths
  });
};

export default taxonomyHandler;
