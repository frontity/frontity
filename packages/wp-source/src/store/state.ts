import { normalizePath } from "./helpers";
import { State } from "../types";

export const state: State = {
  data: state => pathOrLink => state.dataMap[normalizePath(pathOrLink)],
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
