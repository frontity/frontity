import React from "react";
import { Processor } from "../types";
import Iframe from "@frontity/components/iframe";

const iframe: Processor<React.HTMLProps<HTMLIFrameElement>> = {
  test: ({ node }) => node.type === "element" && node.component === "iframe",
  priority: 20,
  processor: ({ node }) => {
    if (node.type === "element") {
      if (node.parent && node.parent.component === "noscript") return node;

      if (node.props["data-src"]) {
        node.props.src = node.props["data-src"];
      }

      node.component = Iframe;
    }

    return node;
  },
};

export default iframe;
