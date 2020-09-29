import { schema } from "normalizr";
import { postEntity, postType } from "./posts";
import { taxonomyEntity, taxonomyType } from "./taxonomies";
import { authorEntity } from "./authors";
import { attachmentEntity } from "./attachments";
import { commentEntity } from "./comments";

export const entity = new schema.Union(
  {
    postEntity,
    postType,
    taxonomyEntity,
    taxonomyType,
    authorEntity,
    attachmentEntity,
    commentEntity,
  },
  (val) => {
    if (val.taxonomies && val.rest_base) return "postType";
    else if (val.types && val.rest_base) return "taxonomyType";
    else if (val.taxonomy) return "taxonomyEntity";
    else if (val.media_type) return "attachmentEntity";
    else if (val.name) return "authorEntity";
    else if (val.type === "comment") return "commentEntity";
    return "postEntity";
  }
);

export const list = new schema.Array(entity);
