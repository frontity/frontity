import PackageBase from "../package";
import Store from "../store";
import { DataMap, Data } from "./data";
import { TaxonomyMap, PostTypeMap, AuthorMap, AttachmentMap } from "./entities";

type PathOrObj = string | { path: string; page: number };

export interface Package extends PackageBase {
  namespaces?: "source"[];
  settings: {
    source: {
      apiUrl: string;
    };
  };
}

export interface SourceStore extends Store {
  state: {
    source: {
      data: Derived<SourceStore, PathOrObj, Data>;
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
      fetch: Action<SourceStore, PathOrObj>;
    };
  };
  reactions: {
    source: {};
  };
}

export type ResolveState<State extends Store["state"]> = State extends undefined
  ? {}
  : {
      [P in keyof State]: State[P] extends (state: Store["state"]) => any
        ? ReturnType<State[P]>
        : State[P] extends Array<any>
        ? State[P]
        : State[P] extends Store["state"]
        ? ResolveState<State[P]>
        : State[P]
    };
