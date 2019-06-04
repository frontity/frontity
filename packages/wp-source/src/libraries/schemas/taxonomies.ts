import { schema } from "normalizr";
import { removeDomain } from "../route-utils";

export const taxonomy = new schema.Entity(
  "taxonomy",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = removeDomain(result.link);
      result.taxonomy =
        result.taxonomy === "post_tag" ? "tag" : result.taxonomy;
      return result;
    }
  }
);
export const taxonomies = new schema.Array(taxonomy);
