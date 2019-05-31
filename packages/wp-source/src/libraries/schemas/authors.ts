import { schema } from "normalizr";
import { removeDomain } from "./utils";

export const author = new schema.Entity(
  "author",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = removeDomain(result.link);
      return result;
    }
  }
);
export const authors = new schema.Array(author);
