import { Processor, Element } from "../types";
import Script from "@frontity/components/script";

const script: Processor = {
  test: node => node.type === "element" && node.component === "script",
  priority: 20,
  process: (node: Element) => {
    if (node.parent.component === "noscript") return node;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    node.component = Script;

    return node;
  }
};

export default script;
