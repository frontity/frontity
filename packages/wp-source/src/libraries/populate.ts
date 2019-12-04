import { State } from "frontity/types";
import WpSource from "../../types";
import { normalize } from "normalizr";
import * as schemas from "./schemas";
import { concatPath, decomposeRoute } from "./route-utils";

const transformLink = ({
  entity,
  state,
  ...options
}: {
  entity: {
    link: string;
  };
  state: State<WpSource>;
  subdirectory?: string;
}): void => {
  let { subdirectory } = state.source;
  if (options.subdirectory) subdirectory = options.subdirectory;

  // get API subdirectory
  const path = !state.source.isWpCom
    ? decomposeRoute(state.source.api).pathname.replace(/\/wp-json\/?$/, "/")
    : "";

  // remove API subdirectory
  let { link } = entity;
  if (path && link.startsWith(path)) link = link.replace(path, "/");

  // add subdirectory if it exists
  entity.link = subdirectory ? concatPath(subdirectory, link) : link;
};

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
      if (entity.link) transformLink({ entity, state, subdirectory });

      // Get or init data using the transformed link
      const { data } = state.source;
      const entityData =
        data[entity.link] ||
        (data[entity.link] = {
          isReady: false,
          isFetching: false
        });

      if (schema === "postEntity" || schema === "attachmentEntity") {
        if (!state.source[entity.type]) state.source[entity.type] = {};
        state.source[entity.type][entity.id] = entity;
        Object.assign(entityData, {
          type: entity.type,
          id: entity.id
        });
      } else if (schema === "taxonomyEntity") {
        if (!state.source[entity.taxonomy]) state.source[entity.taxonomy] = {};
        state.source[entity.taxonomy][entity.id] = entity;
        Object.assign(entityData, {
          taxonomy: entity.taxonomy,
          id: entity.id
        });
      } else if (schema === "authorEntity") {
        state.source.author[entity.id] = entity;
        Object.assign(entityData, {
          id: entity.id
        });
      } else if (schema === "postType") {
        state.source.type[entity.slug] = entity;
      } else if (schema === "taxonomyType") {
        state.source.taxonomy[entity.slug] = entity;
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
