import { Processor, Element } from "../types";
import Iframe from "@frontity/components/iframe";

// WIP
const iframe: Processor = {
  test: node => node.type === "element" && node.component === "iframe",
  priority: 20,
  process: (node: Element) => {
    if (node.parent.component === "noscript") return null;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    node.component = Iframe;

    return node;
  }
};

export default iframe;
