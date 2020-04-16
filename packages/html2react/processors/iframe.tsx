import { Processor, Element } from "../types";
import Iframe from "@frontity/components/iframe";

interface IframeElement extends Element {
  props: Element["props"] & {
    "data-src"?: string;
  };
}

const iframe: Processor<IframeElement> = {
  test: ({ node }) => node.type === "element" && node.component === "iframe",
  priority: 20,
  processor: ({ node }) => {
    if (node.parent.component === "noscript") return node;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    node.component = Iframe;

    return node;
  },
};

export default iframe;
