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
      authorBase: string;
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
      /**
       * An action that fetches all the information and entities related to a link.
       *
       * It populates the state with both: 
       * - An entry in `state.source.data` with information about that link.
       * - Normalized entities in relevant part of the state, like `state.source.post`, `state.source.category` 
       *   or `state.source.author` and so on.
       *
       * @param link - The link that should be fetched. It can be a URL or a
       * custom link created to fetch additional entities from the REST API.
       * - URLs start with "/".
       * - Non URLs start with "@".
       * @example Fetch the content of the `/some-post` URL:
       * `actions.source.fecth("/some-post");`
       * @example Fetch the comments of the post with id 135:
       * `actions.source.fecth("@comments/135");`
       *
       * @param options - Optional options.
       *
       * @returns A promise that resolves when the data fetching has finished.
       */
      fetch:
        | AsyncAction<WpSource, string>
        | AsyncAction<
            WpSource,
            string,
            {
              /**
               * Whether the fetch should be done again if data for that link
               * already exists.
               */
              force?: boolean;
            }
          >;

      /**
       * An internal action that bootstraps the initialization
       *
       * This action is not meant to be run by the user, but by the Frontity
       * framework.
       */
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
