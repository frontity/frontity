import { normalizeName } from "./helpers";
import {
  DataMap,
  TaxonomyMap,
  PostTypeMap,
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
  post: PostTypeMap;
  page: PostTypeMap;
  author: AuthorMap;
  attachment: AttachmentMap;
};

export const state: State = {
  data: state => nameOrLink => state.dataMap[normalizeName(nameOrLink)],
  dataMap: {},
  // taxonomy: {},
  // type: {},
  category: {},
  tag: {},
  post: {},
  page: {},
  author: {},
  attachment: {}
};
