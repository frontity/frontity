import Package from "@frontity/types/package";
import Action from "@frontity/types/action";
import Derived from "@frontity/types/derived";
import Namespaces from "@frontity/types/namespaces";

import { Data } from "./data";
import { Taxonomy, PostType, Attachment, Author } from "./entities";

export type PathOrObj =
  | string
  | {
      path: string;
      page?: number;
    };

interface Source extends Package {
  name: "@frontity/wp-source";
  namespaces: Namespaces<"source">;
  state: {
    source: {
      data: Derived<Source, (pathOrLink: string) => Data>;
      dataMap: Record<string, Data>;
      category: Record<string, Taxonomy>;
      tag: Record<string, Taxonomy>;
      post: Record<string, PostType>;
      page: Record<string, PostType>;
      author: Record<string, Author>;
      attachment: Record<string, Attachment>;
    };
  };
  actions: {
    source: {
      fetch: Action<Source, PathOrObj>;
      init?: Action<Source>;
    };
  };
  libraries: {
    source: {
      populate: Function;
    }
  };
}

export default Source;
