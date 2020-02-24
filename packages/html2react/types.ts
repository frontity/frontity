import { Package } from "frontity/types";
import { SerializedStyles } from "@emotion/core";
import { Node as HiamalayaNode } from "./himalaya/types";

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
export type NoProps = {
  [key: string]: string | number | boolean;
};

export interface Element<Props = NoProps> {
  type: "element";
  component: string | React.ComponentType;
  props: {
    css?: SerializedStyles;
  } & Props;
  children?: Node<Props>[];
  parent?: Element<Props>;
  ignore?: boolean;
}

export interface Text<Props = NoProps> {
  type: "text";
  content: string;
  parent?: Element<Props>;
  ignore?: boolean;
}

export interface Comment<Props = NoProps> {
  type: "comment";
  content: string;
  parent?: Element<Props>;
  ignore?: boolean;
}

export type Node<Props = NoProps> =
  | Element<Props>
  | Text<Props>
  | Comment<Props>;

export interface Attributes {
  [key: string]: string;
}

export interface Parse {
  (html: string): Node[];
}

export interface AdaptNode {
  (himalayaNode: HiamalayaNode, parent?: Element): Node;
}

// Processors

interface Test<Props = NoProps> {
  (node: Node<Props>): boolean;
}

interface Process<Props = NoProps> {
  (node: Node<Props>, payload: { root: Node<Props>[] }): Node<Props>;
}

export interface Processor<Props = NoProps> {
  name?: string;
  priority?: number;
  test: Test<Props>;
  process: Process<Props>;
}

// Component

export interface Payload {
  root: Node[];
  processors: Processor[];
}

export interface HandleNodes {
  (params: { nodes: Node[]; payload: Payload }): React.ReactNode;
}

export interface HandleNode {
  (params: { node: Node; payload: Payload; index: number }): React.ReactNode;
}

export interface ApplyProcessors {
  (params: {
    node: Node;
    root: Payload["root"];
    processors: Payload["processors"];
  }): boolean;
}

export type Component<T = { html: string }> = React.FC<T>;
