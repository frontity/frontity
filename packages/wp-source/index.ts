import { Action, State } from "@frontity/types";
import Source from "@frontity/source";
import { EntityData } from "@frontity/source/src/data";
import { Api, Resolver, routeUtils } from "./src/libraries";

export type Handler = (
  state: State<WpSource>["source"],
  payload: {
    route: string;
    params: { [param: string]: any };
    libraries: WpSource["libraries"];
  }
) => Promise<void>;

export type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
};

interface WpSource extends Source {
  name: "@frontity/wp-source";
  state: {
    source: Source<WpSource>["state"]["source"] & {
      apiUrl: string;
      isWPCom: boolean;
    };
  };
  actions: {
    source: Source<WpSource>["actions"]["source"] & {
      beforeSSR?: Action<WpSource>;
      beforeCSR?: Action<WpSource>;
    };
  };
  libraries: {
    source: {
      api: Api;
      resolver: Resolver;
      populate: (
        state: State<WpSource>["source"],
        response: Response
      ) => Promise<EntityData[]>;
      getParams: Source<WpSource>["libraries"]["source"]["getParams"];
      getRoute: Source<WpSource>["libraries"]["source"]["getRoute"];
    };
  };
}

export default WpSource;
