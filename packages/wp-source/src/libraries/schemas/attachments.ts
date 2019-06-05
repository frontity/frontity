import { schema } from "normalizr";
import { author } from "./authors";
import { normalize } from "../route-utils";

export const attachment = new schema.Entity(
  "attachment",
  {
    _embedded: {
      author: [author]
    }
  },
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    }
  }
);

export const attachments = new schema.Array(attachment);
