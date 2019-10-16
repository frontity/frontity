import { schema } from "normalizr";
import { postType } from "./postTypes";
import { taxonomy } from "./taxonomies";
import { author } from "./authors";
import { comment } from "./comments";
import { attachment } from "./attachments";

export const entity = new schema.Union(
  {
    postType,
    taxonomy,
    author,
    comment,
    attachment
  },
  val => {
    if (val.taxonomy) return "taxonomy";
    else if (val.media_type) return "attachment";
    else if (val.name) return "author";
    else if (val.type === "comment") return "comment";
    return "postType";
  }
);

export const list = new schema.Array(entity);
