import { normalize } from "normalizr";
import * as schemas from "../../schemas";
import { Context, ArchiveData, DataPage } from "../../types";
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

  return entity && entity.id;
};

export const getTotal = (response: Response): number =>
  parseInt(response.headers.get("X-WP-Total"));

export const getTotalPages = (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));

export const populate = async (
  ctx: Context,
  {
    response,
    name,
    page
  }: {
    response: Response;
    name: string;
    page?: number;
  }
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

  if (page && isList) {
    // Add the received page of entities
    const data = <ArchiveData>state.source.data[name];
    data.page = data.page || [];
    data.page[page - 1] = entityList; // transform page number to index!!
  }

  // add entities to state
  for (let [, single] of Object.entries(entities)) {
    for (let [, entity] of Object.entries(single)) {
      const { type, id, link } = entity;
      const name = new URL(link).pathname;
      state.source[type][id] = entity;
      await fetch(ctx, { name, isPopulated: true });
    }
  }

  return entityList;
};
