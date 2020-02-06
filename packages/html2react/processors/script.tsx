import { Processor, Element } from "../types";
import Script from "@frontity/components/script";

const validMediaTypes = [
  "application/javascript",
  "text/javascript",
  "application/ecmascript"
];

const script: Processor = {
  test: node => {
    if (node.type === "element" && node.component === "script") {
      if (
        "type" in node.props &&
        !validMediaTypes.includes("" + node.props.type)
      ) {
        return false;
      }

      return true;
    }

    return false;
  },
  priority: 20,
  name: "script",
  process: (node: Element) => {
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

    return node;
  }
};

export default script;
