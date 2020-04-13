/* eslint-disable @typescript-eslint/no-unused-vars */
import { Processor } from "../types";

// Simple functions to check types.
export const expectType = <T>(value: T) => {
  value;
};

// Default processor should
const defaultProcessor: Processor = {
  test: () => true,
  processor: ({ node }) => {
    node.props.onMouseDown;
    return node;
  },
};

const processorWithElementDef: Processor<{
  type: "element";
  props: {
    src: string;
  };
}> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"element">(node.type);
    expectType<string>(node.props.src);
    return node;
  },
};

const processorWithElementAndParent: Processor<{
  type: "element";
  props: {
    src: string;
  };
  parent: {
    type: "element";
    props: {
      isParent: boolean;
    };
  };
}> = {
  test: () => true,
  processor: ({ node }) => {
    expectType<"element">(node.type);
    expectType<boolean>(node.parent.props.isParent);
    return node;
  },
};

test("Types are fine!", () => {});
