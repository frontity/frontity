import { Processor, Element } from "../types";
import Iframe from "@frontity/components/iframe";

/**
 * Type for the Element processed by the {@link iframe} processor.
 */
interface IframeElement extends Element {
  /**
   * Props.
   */
  props: Element["props"] & {
    /**
     * The optional data-src attribute.
     */
    "data-src"?: string;
  };
}

const iframe: Processor<IframeElement> = {
  name: "iframe",
  test: ({ node }) => node.component === "iframe",
  priority: 20,
  processor: ({ node }) => {
    if (node.parent?.component === "noscript") return node;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    node.component = Iframe;

    return node;
  },
};

export default iframe;
