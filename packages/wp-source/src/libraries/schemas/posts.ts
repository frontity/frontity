import { schema } from "normalizr";
import { taxonomies } from "./taxonomies";
import { author } from "./authors";
import { attachment } from "./attachments";
import { normalize } from "../route-utils";

export const postType = new schema.Entity("postType");

export const post = new schema.Entity(
  "post",
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };
      result.link = normalize(result.link);
      return result;
    }
  }
);

post.define({
  _embedded: {
    author: [author],
    type: [postType],
    "wp:featuredmedia": [attachment],
    "wp:contentmedia": [[attachment]],
    "wp:term": taxonomies
  }
});

export const posts = new schema.Array(post);
