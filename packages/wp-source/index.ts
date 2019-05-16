import { Action, State } from "@frontity/types";
import Source from "@frontity/source";
import { EntityData } from "@frontity/source/src/data";
import { Api, Resolver } from "./src/libraries";

export type Handler = (
  state: State<WpSource>["source"],
  payload: {
    path: string;
    params: { [param: string]: any };
    page?: number;
    libraries: WpSource["libraries"];
  }
) => Promise<void>;

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
    };
  };
}

export default WpSource;
