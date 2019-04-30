import { normalize } from "normalizr";
import * as schemas from "../../schemas";
import { Context, DataPage } from "../../types";
import { fetch } from "../actions";

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

  if (!entity)
    throw new Error(`Entity of type '${type}' with slug '${slug}' not found`);

  return entity && entity.id;
};

export const getTotal = (response: Response): number =>
  parseInt(response.headers.get("X-WP-Total"));

export const getTotalPages = (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));

export const populate = async (
  ctx: Context,
  response: Response
): Promise<DataPage> => {
  const { state } = ctx;

  // Normalize response
  const json = await response.json();
  const isList = json instanceof Array;
  const { entities, result } = normalize(
    json,
    isList ? schemas.list : schemas.entity
  );

  // type, id and link of added entities
  const entityList: DataPage = (isList ? result : [result]).map(
    ({ id: entityId, schema }) => {
      const { type, id, link } = entities[schema][entityId];
      return { type, id, link };
    }
  );

  // add entities to state
  // mirar aquí la estructura de entity y arreglar esto
  for (let [entityType, entityMap] of Object.entries(entities)) {
    for (let [, entity] of Object.entries(entityMap)) {
      const { id, link } = entity;
      const path = new URL(link).pathname;

      let type: string;

      if (entityType === "postType" || entityType === "attachment")
        type = entity.type;
      else if (entityType === "taxonomy") type = entity.taxonomy;
      else if (entityType === "author") type = "author";

      // Hack to prevent errors trying to populate taxonomy "latest"
      if (type === "latest") break;

      state.source[type][id] = entity;

      // Do not fetch attachments at this moment
      if (entityType !== "attachment")
        await fetch(ctx, { path, isPopulating: true });
    }
  }

  return entityList;
};

export const normalizePath = (pathOrLink: string): string => {
  try {
    return new URL(pathOrLink).pathname;
  } catch (e) {
    // is not a URL
    return pathOrLink;
  }
};
