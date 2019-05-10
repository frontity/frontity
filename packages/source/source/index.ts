import { Package, Derived, Action } from "../../types/src";
import { DataMap, Data } from "./data";
import { TaxonomyMap, PostTypeMap, AuthorMap, AttachmentMap } from "./entities";

type PathOrObj = string | { path: string; page: number };

export interface Source extends Package {
  state: {
    source: {
      data: Derived<Source, PathOrObj, Data>;
      dataMap: DataMap;
      category: TaxonomyMap;
      tag: TaxonomyMap;
      post: PostTypeMap;
      page: PostTypeMap;
      author: AuthorMap;
      attachment: AttachmentMap;
    };
  };
  actions: {
    source: {
      fetch: Action<Source, PathOrObj>;
    };
  };
  libraries: {
    source: {
      populate: Function;
    };
    router?: {
      myAction: () => {};
    };
  };
}

export default Source;
