import { schema } from "normalizr";
import { normalize } from "../route-utils";

export const comment = new schema.Entity(
  "comment",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    }
  }
);
export const comments = new schema.Array(comment);
