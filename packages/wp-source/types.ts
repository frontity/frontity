import { Action, State, Derived } from "frontity/types";
import Source from "@frontity/source";
import { EntityData } from "@frontity/source/src/data";
import { Api } from "./src/libraries";

export type Pattern<F extends Function = (params: any) => any> = {
  name: string;
  priority: number;
  pattern: string;
  func: F;
};

export type Handler = (args: {
  route: string;
  params: { [param: string]: any };
  state: State<WpSource>;
  libraries: WpSource["libraries"];
}) => Promise<void>;

export type Redirection = (params?: Record<string, string>) => string;

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
};

interface WpSource extends Source {
  name: "@frontity/wp-source";
  state: {
    source: Source<WpSource>["state"]["source"] & {
      api: string;
      isWpCom: Derived<WpSource, boolean>;
      subdirectory: string;
      categoryBase: string;
      tagBase: string;
      homepage: string;
      postsPage: string;
      postEndpoint: string;
      params: Record<string, any>;
    };
  };
  actions: {
    source: Source<WpSource>["actions"]["source"] & {
      init: Action<WpSource>;
    };
  };
  libraries: {
    source: {
      api: Api;
      populate: (args: {
        state: State<WpSource>;
        response: Response;
        subdirectory?: string;
      }) => Promise<EntityData[]>;
      handlers: Pattern<Handler>[];
      redirections: Pattern<Redirection>[];
      parse: Source<WpSource>["libraries"]["source"]["parse"];
      stringify: Source<WpSource>["libraries"]["source"]["stringify"];
      normalize: Source<WpSource>["libraries"]["source"]["normalize"];
      getTotal: (Response) => number;
      getTotalPages: (Response) => number;
    };
  };
}

export default WpSource;
