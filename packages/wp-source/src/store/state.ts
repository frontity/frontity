import {
  DataMap,
  TaxonomyMap,
  SingleMap,
  AttachmentMap,
  AuthorMap,
  Derive,
  Data
} from "../types";

type State = {
  data: Derive<State, (nameOrLink: string) => Data>;
  dataMap: DataMap;
  category: TaxonomyMap;
  tag: TaxonomyMap;
  post: SingleMap;
  page: SingleMap;
  author: AuthorMap;
  attachment: AttachmentMap;
};

export const state: State = {
  data: state => nameOrLink => state.dataMap[nameOrLink],
  dataMap: {},
  // taxonomy: {},
  category: {},
  tag: {},
  // type: {},
  post: {},
  page: {},
  author: {},
  attachment: {}
};
