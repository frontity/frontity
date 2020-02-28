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

// Parse
export interface Element<Props = any> {
  type: "element";
  component: string | React.ComponentType;
  props: {
    css?: SerializedStyles;
  } & Props;
  children?: Node<unknown>[];
  parent?: Element<unknown>;
  ignore?: boolean;
}

export interface Text {
  type: "text";
  content: string;
  parent?: Element<unknown>;
  ignore?: boolean;
}

export interface Comment {
  type: "comment";
  content: string;
  parent?: Element<unknown>;
  ignore?: boolean;
}

export type Node<Props = any> = Element<Props> | Text | Comment;

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
interface Params<Props, Pkg extends Package> {
  node: Node<Props>;
  root: Node<Props>[];
  state: State<Pkg>;
  libraries: Pkg["libraries"];
}

interface Test<Props, Pkg extends Package> {
  (
    params: Node<Props> & Params<Props, Pkg>,
    payload?: Omit<Params<Props, Pkg>, "node">
  ): boolean;
}

interface Process<Props, Pkg extends Package> {
  (
    params: Node<Props> & Params<Props, Pkg>,
    payload?: Omit<Params<Props, Pkg>, "node">
  ): Node<Props> | boolean;
}

export interface Processor<Props = any, Pkg extends Package = Package> {
  name?: string;
  priority?: number;
  test: Test<Props, Pkg>;
  process: Process<Props, Pkg>;
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
