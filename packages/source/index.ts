import Package from "@frontity/types/package";
import Action from "@frontity/types/action";
import Derived from "@frontity/types/derived";
import Namespaces from "@frontity/types/namespaces";

import { MapOf } from "./utils";
import { Data } from "./data";
import { Taxonomy, PostType, Attachment, Author } from "./entities";

export type PathOrObj =
  | string
  | {
      path: string;
      page?: number;
    };

interface WpSource extends Package {
  name: "@frontity/wp-source";
  namespaces: Namespaces<"source">;
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
      init?: Action<WpSource>;
    };
  };
  libraries: {
    populate: Function;
  };
}

export default WpSource;
