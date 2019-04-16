import { Context } from "../types";

const typesToEndpoints = {
  author: "users",
  category: "categories",
  tag: "tags",
  post: "posts",
  page: "pages",
  attachment: "media"
};

export const getIdBySlug = async (
  ctx: Context,
  type: string,
  slug: string
): Promise<number> => {
  const state = ctx.state.source;
  const effects = ctx.effects.source;

  // Search an entity with the given slug
  let entity: any = Object.values(state[type]).find(
    (e: any) => e.slug === slug
  );

  // Found: return entity id
  if (entity) return entity.id;

  // Not found: get it from the WP REST API
  ({ entities: entity } = await effects.api.get({
    endpoint: typesToEndpoints[type] || '',
    params: { slug }
  }));

  return entity && entity.id;
};
