import { Package, State } from "frontity/types";
import React from "react";
import { SerializedStyles } from "@emotion/core";
import { Node as HimalayaNode } from "./himalaya/types";

interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      parse: Parse;
      processors: Processor[];
      Component: Component;
    };
  };
}

export default Html2React;

export interface Element<Def extends ElementDef> {
  type: "element";
  // component: any;
  // component: React.FC<Def["props"]> extends React.FC | null
  //   ? React.FC<Def["props"]> | string
  //   : null;
  component: React.FC | string;
  props: {
    css?: SerializedStyles;
  } & Def["props"];
  children: Def extends { children: (infer T)[] } ? ResolveNode<T>[] : [];
  parent: Def extends { parent: any } ? ResolveNode<Def["parent"]> : null;
  ignore?: boolean;
}

export type ElementDef = {
  type: "element";
  component?: "string";
  props?: {};
  children?: (ElementDef | TextDef)[];
  parent?: ElementDef;
};

export interface Text<Def extends TextDef> {
  type: "text" | "comment";
  content: string;
  parent: Def extends { parent: any }
    ? ResolveNode<Def["parent"]>
    : Element<ElementDef>;
  ignore?: boolean;
}

export type TextDef = {
  type: "text" | "comment";
  parent?: ElementDef;
  content: string;
};

export type ResolveNode<NodeDef> = NodeDef extends ElementDef
  ? Element<NodeDef>
  : NodeDef extends TextDef
  ? Text<NodeDef>
  : never;

export type Node<NodeDef = any> = ResolveNode<NodeDef>;

export interface Attributes {
  [key: string]: string;
}

export interface Parse {
  (html: string): Node[];
}

export interface AdaptNode<Def extends Node> {
  (
    himalayaNode: HimalayaNode,
    parent?: Def extends { parent: any } ? ResolveNode<Def["parent"]> : any
  ): Node;
}

// Processors.
interface Params<NodeDef, Pkg extends Package> {
  node: Node<NodeDef>;
  root: Node<NodeDef>[];
  state: State<Pkg>;
  libraries: Pkg["libraries"];
}

type Test<NodeDef, Pkg extends Package> = (
  params: Params<NodeDef, Pkg>
) => boolean;

type Process<NodeDef, Pkg extends Package> = (
  params: Params<NodeDef, Pkg>
) => Node | boolean;

type DefaultNodeDef = {
  type: "element";
  props: React.HTMLProps<HTMLElement>;
};

export interface Processor<
  NodeDef extends ElementDef | TextDef = DefaultNodeDef,
  Pkg extends Package = Package
> {
  name?: string;
  priority?: number;
  test: Test<NodeDef, Pkg>;
  processor: Process<NodeDef, Pkg>;
}

// Component functions.
interface Payload {
  root: Node[];
  processors: Processor[];
  state: State<Html2React>;
  libraries: Html2React["libraries"];
}

export interface HandleNodes {
  (
    params: {
      nodes: Node[];
    } & Payload
  ): React.ReactNode;
}

export interface HandleNode {
  (
    params: {
      node: Node;
      index: number;
    } & Payload
  ): React.ReactNode;
}

export interface ApplyProcessors {
  (
    params: {
      node: Node;
    } & Payload
  ): React.ReactNode;
}

export type Component<T = { html: string }> = React.FC<T>;
