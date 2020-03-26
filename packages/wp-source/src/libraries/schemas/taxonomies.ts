import { schema } from "normalizr";
import { normalize } from "../route-utils";

export const taxonomyType = new schema.Entity("taxonomyType");

export const taxonomyEntity = new schema.Entity(
  "taxonomyEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      result.taxonomy =
        result.taxonomy === "post_tag" ? "tag" : result.taxonomy;
      return result;
    },
  }
);
export const taxonomyEntities = new schema.Array(taxonomyEntity);
