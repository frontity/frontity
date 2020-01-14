import { schema } from "normalizr";
import { authorEntity } from "./authors";
import { normalize } from "../route-utils";

export const attachmentEntity = new schema.Entity(
  "attachmentEntity",
  {
    _embedded: {
      author: [authorEntity]
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

export const attachmentEntities = new schema.Array(attachmentEntity);
