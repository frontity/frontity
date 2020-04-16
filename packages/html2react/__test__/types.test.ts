/* eslint-disable @typescript-eslint/no-unused-vars */

import { Processor, Element, Text, Component } from "../types";
import IFrame from "@frontity/components/iframe";

// Simple functions to check types.
export const expectType = <T>(value: T) => {
  value;
};

// Default processor should
const defaultProcessor: Processor<Element> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"element" | "text">(node.type);
    node.props.onMouseDown;
    node.props;
    return {
      component: IFrame,
      whatever: "props",
    };
  },
};

const processorWithComment: Processor<{
  type: "comment";
  content: "string";
}> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"comment">(node.type);
    expectType<string>(node.content);
    return {
      type: "element",
      component: IFrame,
    };
  },
};

const processorWithText: Processor<{
  type: "text";
  content: "string";
}> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"text">(node.type);
    expectType<string>(node.content);
    return {
      type: "element",
      component: IFrame,
    };
  },
};

const processorWithElementDef: Processor<{
  type: "element";
  component: Component;
  props: Element["props"] & {
    myOwnProp: string;
  };
}> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"element">(node.type);
    expectType<Component>(node.component);
    expectType<string>(node.props.src);
    expectType<string>(node.props.title);
    expectType<string>(node.props.myOwnProp);
    return node;
  },
};

interface MyElementParent extends Element {
  props: Element["props"] & {
    isParent: true;
  };
}

interface MyElement extends Element {
  type: "element";
  component: string;
  props: Element["props"] & {
    isChild: true;
  };
  parent: MyElementParent;
}

const processorWithElementAndParent: Processor<MyElement> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"element">(node.type);
    expectType<true>(node.parent.props.isParent);
    return node;
  },
};

test("Types are fine!", () => {});
