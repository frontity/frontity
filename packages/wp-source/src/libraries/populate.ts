import WpSource from "../../";
import { normalize } from "normalizr";
import * as schemas from "./schemas";

const populate: WpSource["libraries"]["source"]["populate"] = async (
  source,
  response
) => {
  // Normalize response
  const json = await response.json();
  const isList = json instanceof Array;
  const { entities, result } = normalize(
    json,
    isList ? schemas.list : schemas.entity
  );

  // type, id and link of added entities
  const entityList = (isList ? result : [result]).map(
    ({ id: entityId, schema }) => {
      const { type, id, link } = entities[schema][entityId];
      return { type, id, link };
    }
  );

  // add entities to source
  Object.entries(entities).forEach(([schema, entityMap]) => {
    Object.entries(entityMap).forEach(([, entity]) => {
      if (schema === "postType" || schema === "attachment") {
        if (source[entity.type]) source[entity.type][entity.id] = entity;
      } else if (schema === "taxonomy") {
        if (source[entity.taxonomy])
          source[entity.taxonomy][entity.id] = entity;
      } else if (schema === "author") {
        source.author[entity.id] = entity;
      }
    });
  });

  return entityList;
};

export default populate;
