import { schema } from "normalizr";
import { normalize } from "../route-utils";

export const author = new schema.Entity(
  "author",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    }
  }
);
export const authors = new schema.Array(author);
