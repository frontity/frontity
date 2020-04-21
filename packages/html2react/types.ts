import { Package, State } from "frontity/types";
import React from "react";
import { SerializedStyles } from "@emotion/core";
import { Node as HimalayaNode } from "./himalaya/types";

interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      processors: Processor[];
      Component: Component;
    };
  };
}

export default Html2React;

export interface Element {
  type: "element";
  component: string | React.ComponentType;
  props: {
    css?: SerializedStyles;
  } & React.HTMLProps<any>;
  children?: Node[];
  parent?: Element;
  ignore?: boolean;
}

export interface Text {
  type: "text";
  content: string;
  parent?: Element;
  ignore?: boolean;
}

export interface Comment {
  type: "comment";
  content: string;
  parent?: Element;
  ignore?: boolean;
}

export type Node = Element | Text | Comment;

export interface Attributes {
  [key: string]: string;
}

export interface Parse {
  (html: string): Node[];
}

export interface AdaptNode {
  (himalayaNode: HimalayaNode, parent?: Element): Node;
}

// Processors.
interface Params<NodeDef extends Node, Pkg extends Package> {
  node: NodeDef;
  root: Node[];
  state: State<Pkg>;
  libraries: Pkg["libraries"];
}

type Test<NodeDef extends Node, Pkg extends Package> = (
  params: Params<NodeDef, Pkg>
) => boolean;

type Process<NodeDef extends Node, Pkg extends Package> = (
  params: Params<NodeDef, Pkg>
) => Partial<Node> | boolean;

export interface Processor<
  NodeDef extends Node = Node,
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
