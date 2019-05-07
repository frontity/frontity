import Package from "@frontity/types/package";
import Action from "@frontity/types/action";
import Derived from "@frontity/types/derived";
import { ResolveState } from "@frontity/types/utils";
// import Namespaces from "@frontity/types/namespaces";
import { Data, EntityData } from "./data";
import { Taxonomy, PostType, Attachment, Author } from "./entities";
import Api from "../libraries/api";
import Resolver from "../libraries/resolver";

export type MapOf<T> = {
  [key: string]: T;
};

export type PathOrObj =
  | string
  | {
      path: string;
      page?: number;
    };

export type State = ResolveState<WpSource["state"]>;

export type Libraries = {
  source: {
    api: Api;
    resolver: Resolver;
    populate: (
      state: State["source"],
      response: Response
    ) => Promise<EntityData[]>;
  };
};

export type Handler = (
  state: State["source"],
  payload: {
    path: string;
    params: { [param: string]: any };
    page?: number;
    libraries: Libraries
  },
) => Promise<void>;

interface WpSource extends Package {
  name: "@frontity/wp-source";
  // namespaces: Namespaces<"source">;
  state: {
    settings: {
      source: {
        apiUrl: string;
        isCom: boolean;
      };
    };
    source: {
      data: Derived<WpSource, (pathOrLink: string) => Data>;
      dataMap: MapOf<Data>;
      category: MapOf<Taxonomy>;
      tag: MapOf<Taxonomy>;
      post: MapOf<PostType>;
      page: MapOf<PostType>;
      author: MapOf<Author>;
      attachment: MapOf<Attachment>;
    };
  };
  actions: {
    source: {
      fetch: Action<WpSource, PathOrObj>;
      init: Action<WpSource>;
      beforeSSR?: Action<WpSource>;
      beforeCSR?: Action<WpSource>;
    };
  };
  libraries: Libraries;
}

export default WpSource;
