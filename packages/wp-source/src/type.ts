import Action from "@frontity/types/action";
import { ResolveState } from "@frontity/types/utils";
import Source, { PathOrObj } from "@frontity/source";
import { EntityData } from "@frontity/source/data";
import { Api, Resolver } from "./libraries";

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
    libraries: Libraries;
  }
) => Promise<void>;

interface WpSource extends Source {
  name: "@frontity/wp-source";
  state: {
    source: Source["state"]["source"] & {
      apiUrl: string;
      isCom: boolean;
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
