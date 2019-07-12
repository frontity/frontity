import { State } from "frontity/types";
import WpSource from "../../types";
import { normalize } from "normalizr";
import * as schemas from "./schemas";
import { concatPath, decomposeRoute } from "./route-utils";

const populate: WpSource["libraries"]["source"]["populate"] = async ({
  response,
  state,
  subdirectory
}) => {
  // Normalize response
  const json = await response.json();
  const isList = json instanceof Array;
  const { entities, result } = normalize(
    json,
    isList ? schemas.list : schemas.entity
  );

  // Add entities to source
  Object.entries(entities).forEach(([schema, entityMap]) => {
    Object.entries(entityMap).forEach(([, entity]) => {
      // Fix links that come from the REST API
      // to match the Frontity server location.
      transformLink({ entity, state, subdirectory });

      if (schema === "postType" || schema === "attachment") {
        if (state.source[entity.type])
          state.source[entity.type][entity.id] = entity;
      } else if (schema === "taxonomy") {
        if (state.source[entity.taxonomy])
          state.source[entity.taxonomy][entity.id] = entity;
      } else if (schema === "author") {
        state.source.author[entity.id] = entity;
      }
    });
  });

  // Return type, id and link of added entities
  return (isList ? result : [result]).map(({ id: entityId, schema }) => {
    const { type, id, link } = entities[schema][entityId];
    return { type, id, link };
  });
};

export default populate;

const transformLink = ({
  entity,
  state,
  ...options
}: {
  entity: any;
  state: State<WpSource>;
  subdirectory?: string;
}) => {
  let { isWpCom, api, subdirectory } = state.source;
  if (options.subdirectory) subdirectory = options.subdirectory;

  // get API subdirectory
  const path = !isWpCom
    ? decomposeRoute(api).pathname.replace(/\/wp-json\/?$/, "/")
    : "";

  // remove API subdirectory
  let { link } = entity;
  if (path && link.startsWith(path)) link = link.replace(path, "/");

  // add subdirectory if it exists
  entity.link = subdirectory ? concatPath(subdirectory, link) : link;
};
