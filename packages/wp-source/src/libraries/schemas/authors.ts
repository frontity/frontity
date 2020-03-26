import { schema } from "normalizr";
import { normalize } from "../route-utils";

export const authorEntity = new schema.Entity(
  "authorEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
);
export const authorEntities = new schema.Array(authorEntity);
