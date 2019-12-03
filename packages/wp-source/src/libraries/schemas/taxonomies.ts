import { schema } from "normalizr";
import { normalize } from "../route-utils";

export const taxonomyType = new schema.Entity("taxonomyType");

export const taxonomy = new schema.Entity(
  "taxonomy",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      result.taxonomy =
        result.taxonomy === "post_tag" ? "tag" : result.taxonomy;
      return result;
    }
  }
);
export const taxonomies = new schema.Array(taxonomy);
