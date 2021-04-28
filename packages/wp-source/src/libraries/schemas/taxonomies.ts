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
      return result;
    },
  }
);

export const categoryEntity = new schema.Entity(
  "categoryEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
);

export const tagEntity = new schema.Entity(
  "tagEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      // Replace "post_tag" with "tag".
      result.taxonomy = "tag";
      return result;
    },
  }
);

export const taxonomyEntities = new schema.Array(
  new schema.Union({ categoryEntity, tagEntity, taxonomyEntity }, (val) => {
    if (val.taxonomy === "category") return "categoryEntity";
    if (val.taxonomy === "post_tag") return "tagEntity";
    return "taxonomyEntity";
  })
);
