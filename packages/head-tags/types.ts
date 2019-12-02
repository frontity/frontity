import { Package, Derived } from "frontity/types";
import Source from "@frontity/source";
import Router from "@frontity/router";

export type HeadTags = {
  tag: string;
  attributes?: Record<string, string>;
  content?: string;
}[];

interface HeadTagsPackage extends Package {
  name: "@frontity/head-tags";
  roots: {
    headTags: React.FC;
  };
  state: {
    source?: Source["state"]["source"];
    router?: Router["state"]["router"];
    // headTags: {
    //   fromCurrentLink: Derived<HeadTagsPackage, HeadTags>;
    // };
  };
}

export default HeadTagsPackage;
