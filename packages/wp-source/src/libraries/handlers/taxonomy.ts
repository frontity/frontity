import { Handler } from "../../../";
import getIdBySlug from "./utils/get-id-by-slug";
import getTotal from "./utils/get-total";
import getTotalPages from "./utils/get-total-pages";

const taxonomyHandler = ({
  taxonomy,
  postType,
  truths = {}
}: {
  taxonomy: { type: string; endpoint: string };
  postType: { endpoint: string; param: string };
  props?: Record<string, string>;
  truths?: Record<string, true>;
}): Handler => async (source, { route, params, libraries }) => {
  const { api, populate, parse } = libraries.source;
  const { page, query } = parse(route);

  // 1. search id in state or get it from WP REST API
  const { slug } = params;
  const id =
    getIdBySlug(source[taxonomy.type], slug) ||
    (await api.getIdBySlug(taxonomy.endpoint, slug));

  // 2. fetch the specified page
  const response = await api.get({
    endpoint: postType.endpoint,
    params: { [postType.param]: id, search: query.s, page, _embed: true }
  });

  // 3. throw an error if page is out of range
  const total = getTotal(response);
  const totalPages = getTotalPages(response);
  if (page > totalPages) throw new Error("Page doesn't exist.");

  // 4. populate response and add page to data
  const items = await populate(source, response);

  // 5. add data to source
  Object.assign(source.data[route], {
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
