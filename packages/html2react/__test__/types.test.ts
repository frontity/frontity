/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectType } from "frontity/types/helpers";
import { Processor, Node, Element, Text, Comment } from "../types";

// 1. Processor by default accepts Element, Text or Comment.
const proc1: Processor = {
  test: ({ node }) => {
    expectType<"element" | "text" | "comment">(node.type);

    if (node.type === "element") expectType<Element>(node);
    if (node.type === "text") expectType<Text>(node);
    if (node.type === "comment") expectType<Comment>(node);

    return true;
  },
  processor: ({ node }) => {
    expectType<"element" | "text" | "comment">(node.type);

    if (node.type === "element") expectType<Element>(node);
    if (node.type === "text") expectType<Text>(node);
    if (node.type === "comment") expectType<Comment>(node);

    return node;
  },
};

// 2. Processor with default Element should receive correct types.
const proc2: Processor<Element> = {
  test: ({ node }) => {
    expectType<Element>(node);
    expectType<string | React.ComponentType>(node.component);
    expectType<Element>(node.parent);
    expectType<Node[]>(node.children);

    // Test CSS prop.
    expectType<Element["props"]["css"]>(node.props.css);

    // Test some HTML props.
    expectType<string>(node.props.id);
    expectType<string>(node.props.className);
    expectType<string>(node.props.src);
    expectType<string>(node.props.srcSet);

    return true;
  },
  processor: ({ node }) => {
    expectType<Element>(node);
    expectType<string | React.ComponentType>(node.component);
    expectType<Element>(node.parent);
    expectType<Node[]>(node.children);

    // Test CSS prop.
    expectType<Element["props"]["css"]>(node.props.css);

    // Test some HTML props.
    expectType<string>(node.props.id);
    expectType<string>(node.props.className);
    expectType<string>(node.props.src);
    expectType<string>(node.props.srcSet);

    return node;
  },
};

// 3. Element can be extended with custom props.
interface CustomElement extends Element {
  props: Element["props"] & {
    hasCustomProp: true;
  };
}

const proc3: Processor<CustomElement> = {
  test: ({ node }) => {
    expectType<Element>(node);
    expectType<CustomElement>(node);
    expectType<true>(node.props.hasCustomProp);

    return true;
  },
  processor: ({ node }) => {
    expectType<Element>(node);
    expectType<CustomElement>(node);
    expectType<true>(node.props.hasCustomProp);

    return node;
  },
};

// 4. Element can be extended with custom relatives.
interface MyElementParent extends Element {
  props: Element["props"] & {
    isParent: true;
  };
}

interface MyElement extends Element {
  props: Element["props"] & {
    isChild: true;
  };
  parent: MyElementParent;
  children: [Element, Text, Comment];
}

const proc4: Processor<MyElement> = {
  test: ({ node }) => {
    // Test node.
    expectType<MyElement>(node);
    expectType<true>(node.props.isChild);
    // Test parent.
    expectType<MyElementParent>(node.parent);
    expectType<true>(node.parent.props.isParent);
    // Test children.
    expectType<Element>(node.children[0]);
    expectType<Text>(node.children[1]);
    expectType<Comment>(node.children[2]);

    return true;
  },
  processor: ({ node }) => {
    // Test node.
    expectType<MyElement>(node);
    expectType<true>(node.props.isChild);
    // Test parent.
    expectType<MyElementParent>(node.parent);
    expectType<true>(node.parent.props.isParent);
    // Test children.
    expectType<Element>(node.children[0]);
    expectType<Text>(node.children[1]);
    expectType<Comment>(node.children[2]);

    return node;
  },
};

test("Types are fine!", () => {});
