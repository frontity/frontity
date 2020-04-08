import { Package, State } from "frontity/types";
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
  component: string;
  props: {
    css?: SerializedStyles;
  } & Def["props"];
  children: Def extends { children: (infer T)[] } ? ResolveNode<T>[] : null;
  parent: Def extends { parent: any }
    ? ResolveNode<Def["parent"]>
    : Element<ElementDef>;
  ignore?: boolean;
}

export type ElementDef<Props = {}> = {
  type: "element";
  component?: "string";
  props?: Props;
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
};

export type ResolveNode<NodeDef> = NodeDef extends ElementDef
  ? Element<NodeDef>
  : NodeDef extends TextDef
  ? Text<NodeDef>
  : never;

export type Node<Props = {}> = Element<ElementDef<Props>>;

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
interface Params<Props, Pkg extends Package> {
  node: Node<Props>;
  root: Node<Props>[];
  state: State<Pkg>;
  libraries: Pkg["libraries"];
}

type Test<Props, Pkg extends Package> = (params: Params<Props, Pkg>) => boolean;

type Process<Props, Pkg extends Package> = (
  params: Params<Props, Pkg>
) => Node | boolean;

export interface Processor<Props = any, Pkg extends Package = Package> {
  name?: string;
  priority?: number;
  test: Test<Props, Pkg>;
  processor: Process<Props, Pkg>;
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
