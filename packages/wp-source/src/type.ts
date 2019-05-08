import Source from "@frontity/source";
import { EntityData } from "@frontity/source/data";

import Action from "@frontity/types/action";
import { ResolveState } from "@frontity/types/utils";

import Api from "./libraries/api";
import Resolver from "./libraries/resolver";

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

interface WpSource extends Source {
  name: "@frontity/wp-source";
  state: {
    settings: {
      source: {
        apiUrl: string;
        isCom: boolean;
      };
    };
    source: Source["state"]["source"]
  };
  actions: {
    source: {
      fetch: Source["actions"]["source"]["fetch"];
      init: Action<WpSource>;
      beforeSSR?: Action<WpSource>;
      beforeCSR?: Action<WpSource>;
    };
  };
  libraries: Libraries;
}

export default WpSource;