import {
  DataMap,
  TaxonomyMap,
  SingleMap,
  AttachmentMap,
  AuthorMap
} from "../types";

type State = {
  data: DataMap;
  category: TaxonomyMap;
  tag: TaxonomyMap;
  post: SingleMap;
  page: SingleMap;
  author: AuthorMap;
  attachment: AttachmentMap;
};

export const state: State = {
  data: {},
  // taxonomy: {},
  category: {},
  tag: {},
  // type: {},
  post: {},
  page: {},
  author: {},
  attachment: {}
};
