import { schema } from "normalizr";

export const author = new schema.Entity("author");
export const authors = new schema.Array(author);
