import { AsyncAction, Action, State, Derived } from "frontity/types";
import Source, { EntityData } from "@frontity/source/types";
import { Api } from "./src/libraries";

export type Pattern<F extends Function = (params: any) => any> = {
  name: string;
  priority: number;
  pattern: string;
  func: F;
};

export type Handler<Pkg extends Source = WpSource> = (args: {
  link: string;
  route: string;
  params: { [param: string]: any };
  state: State<Pkg>;
  libraries: Pkg["libraries"];
  force?: boolean;
}) => Promise<void>;

export type Redirection = (params?: Record<string, string>) => string;

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
      postTypes: {
        type: string;
        endpoint: string;
        archive?: string;
      }[];
      taxonomies: {
        taxonomy: string;
        endpoint: string;
        postTypeEndpoint?: string;
        params?: Record<string, any>;
      }[];
    };
  };
  actions: {
    source: {
      fetch:
        | AsyncAction<WpSource, string>
        | AsyncAction<WpSource, string, { force?: boolean }>;
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
        force?: boolean;
      }) => Promise<EntityData[]>;
      handlers: Pattern<Handler>[];
      redirections: Pattern<Redirection>[];
      parse: Source["libraries"]["source"]["parse"];
      stringify: Source["libraries"]["source"]["stringify"];
      normalize: Source["libraries"]["source"]["normalize"];
      getTotal: (response: Response, valueIfHeaderMissing: number) => number;
      getTotalPages: (
        response: Response,
        valueIfHeaderMissing: number
      ) => number;
    };
  };
}

export default WpSource;
