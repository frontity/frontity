import { normalize as norm } from "normalizr";
import * as schemas from "../../schemas";
import { Context } from "../../types";

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
  const response = await effects.api.get({
    endpoint: typesToEndpoints[type] || "",
    params: { slug }
  });

  [entity] = await response.json();

  return entity && entity.id;
};

// TODO - Promise must not return "any"
export const normalize = async (response: Response): Promise<any> => {
  const json = await response.json();
  // Normalize response
  const { entities } = norm(
    json,
    json instanceof Array ? schemas.list : schemas.entity
  );
  // Return just the attribute 'entities'
  return entities;
};

export const getTotal = (response: Response): number =>
  parseInt(response.headers.get("X-WP-Total"));

export const getTotalPages = (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));

export const addPage = (data: any, page: number, entities: any[]) => {
  data.page = data.page || [];
  data.page[page || 1] = entities.map(({ type, id, link }) => ({
    type,
    id,
    link
  }));
};
