import { Entity } from "../entities";
import {
  author,
  category,
  tag,
  post,
  attachment,
  postType,
  taxonomy,
} from "../../__tests__/mocks/entities";

const entity: Record<string, Entity> = {};

// As long as it extends `Entity`, any object can be added to `Entity`.
entity.author = author;
entity.category = category;
entity.tag = tag;
entity.post = post;
entity.attachment = attachment;
entity.postType = postType;
entity.taxonomy = taxonomy;

test("Types are fine!", () => {});
