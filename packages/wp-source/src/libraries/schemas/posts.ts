import { schema } from "normalizr";
import { taxonomyEntities } from "./taxonomies";
import { authorEntity } from "./authors";
import { attachmentEntity } from "./attachments";
import { commentEntities } from "./comments";
import { normalize } from "../route-utils";

export const postType = new schema.Entity(
  "postType",
  {},
  {
    idAttribute: "slug",
    processStrategy(entity) {
      const result = { ...entity };

      // Change "post_tag" to "tag"
      if (result.taxonomies)
        result.taxonomies = result.taxonomies.map((slug) =>
          slug === "post_tag" ? "tag" : slug
        );

      return result;
    },
  }
);

export const postEntity = new schema.Entity(
  "postEntity",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    },
  }
);

postEntity.define({
  _embedded: {
    author: [authorEntity],
    type: [postType],
    "wp:featuredmedia": [attachmentEntity],
    "wp:contentmedia": [[attachmentEntity]],
    "wp:term": [taxonomyEntities],
    replies: [commentEntities],
  },
});

export const postEntities = new schema.Array(postEntity);
