import { schema } from "normalizr";
import { post, postType } from "./posts";
import { taxonomy, taxonomyType } from "./taxonomies";
import { author } from "./authors";
import { attachment } from "./attachments";

export const entity = new schema.Union(
  {
    post,
    postType,
    taxonomy,
    taxonomyType,
    author,
    attachment
  },
  val => {
    if (val.taxonomies && val.rest_base) return "postType";
    else if (val.types && val.rest_base) return "taxonomyType";
    else if (val.taxonomy) return "taxonomy";
    else if (val.media_type) return "attachment";
    else if (val.name) return "author";
    return "post";
  }
);

export const list = new schema.Array(entity);
