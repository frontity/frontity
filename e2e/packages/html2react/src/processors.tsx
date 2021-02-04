import * as React from "react";
import { css } from "frontity";
import { Processor, Node } from "@frontity/html2react/types";
import Html2ReactTests from "../types";

export const testProcessor: Processor<
  React.HTMLProps<HTMLParagraphElement>,
  Html2ReactTests
> = {
  test: ({ node }) => node.type === "element" && node.component === "p",
  processor: ({ node, state }) => {
    if (node.type === "element") {
      node.props.css = css`
        color: ${state.html2reactTests.color};
      `;
    }
    return node;
  },
};

export const oldProcessor: Processor = ({
  test: (node: Node) =>
    node.type === "element" &&
    node.component === "span" &&
    node.props.id === "old-processors",
  process: (node: Node, { root }) => {
    if (node.type === "element") {
      node.children = [
        {
          type: "text",
          content: root ? "Yes" : "No",
        },
      ];
    }
    return node;
  },
} as unknown) as Processor;

export default [testProcessor, oldProcessor];
