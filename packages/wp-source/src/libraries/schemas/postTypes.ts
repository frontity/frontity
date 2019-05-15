import { schema } from "normalizr";
import { taxonomy } from "./taxonomies";
import { author } from "./authors";
import { attachment } from "./attachments";

const taxonomies = new schema.Array(new schema.Array(taxonomy));

export const postType = new schema.Entity("postType");

postType.define({
  _embedded: {
    author: [author],
    "wp:featuredmedia": [attachment],
    "wp:contentmedia": [[attachment]],
    "wp:term": taxonomies
  }
});

export const postTypes = new schema.Array(postType);
