import { Processor } from "../types";
import Script from "@frontity/components/script";

const validMediaTypes = [
  "application/javascript",
  "text/javascript",
  "application/ecmascript"
];

type ElementProps = {
  type: string;
  "data-src": string;
  src: string;
  code: string;
};

const script: Processor<ElementProps> = {
  test: ({ node }) =>
    node.type === "element" &&
    node.component === "script" &&
    !("type" in node.props && !validMediaTypes.includes(node.props.type)),
  priority: 20,
  name: "script",
  processor: ({ node }) => {
    if (node.type === "element") {
      if (node.parent && node.parent.component === "noscript") return node;

      if (node.props["data-src"]) {
        node.props.src = node.props["data-src"];
        delete node.props["data-src"];
      }

      if (node.children.length > 0) {
        node.props.code = node.children
          .map(child => (child.type === "text" ? child.content : ""))
          .join("");
        node.children = [];
      }

      node.component = Script;
    }

    return node;
  }
};

export default script;
