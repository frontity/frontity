import { Processor, Element, Text } from "../types";
import Script from "@frontity/components/script";

interface ScriptElement extends Element {
  props: Element["props"] & {
    type?: string;
    src: string;
    code: string;
    "data-src": string;
  };
  children: Text[];
}

const validMediaTypes = [
  "application/javascript",
  "text/javascript",
  "application/ecmascript",
];

const script: Processor<ScriptElement> = {
  test: ({ node }) =>
    node.type === "element" &&
    node.component === "script" &&
    !("type" in node.props && !validMediaTypes.includes(node.props.type)),
  priority: 20,
  name: "script",
  processor: ({ node }) => {
    if (node.parent?.component === "noscript") return node;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
      delete node.props["data-src"];
    }

    if (node.children.length > 0) {
      node.props.code = node.children.map((child) => child.content).join("");
      node.children = [];
    }

    node.component = Script;

    return node;
  },
};

export default script;
