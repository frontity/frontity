import { Package } from "frontity/types";
import { SerializedStyles } from "@emotion/core";
import { Node as HiamalayaNode } from "./himalaya/types";

interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      parse: Parse;
      decode: Decode;
      processors: Processor[];
      Component: Component;
    };
  };
}

export default Html2React;

// Decode

export interface Decode {
  (text: string): string;
}

// Parse

export interface Element {
  type: "element";
  component: string | React.ComponentType;
  props: {
    css?: SerializedStyles;
  } & {
    [key: string]: string | number | boolean;
  };
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
  (html: string, decode: Function): Node[];
}

export interface AdaptNode {
  (himalayaNode: HiamalayaNode, decode: Function, parent?: Element): Node;
}

// Processors

interface Test {
  (node: Node): boolean;
}

interface Process {
  (node: Node, payload: { root: Node[] }): Node;
}

export interface Processor {
  name?: string;
  priority?: number;
  test: Test;
  process: Process;
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
