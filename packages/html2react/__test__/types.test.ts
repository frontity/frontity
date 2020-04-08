import { Processor } from "../types";

// Simple functions to check types.
export const expectType = <T>(value: T) => {
  value;
};

const defaultProcessor: Processor = {
  test: () => true,
  processor: ({ node }) => {
    return node;
  }
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
    return node;
  }
};

const processorWithElementAndParent: Processor<{
  type: "element";
  props: {
    src: string;
  };
  parent: {
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
  }
};

test("Types are fine!", () => {});
