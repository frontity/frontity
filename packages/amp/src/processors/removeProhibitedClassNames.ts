import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

export const removeProhibitedClassNames: Processor<Element, Packages> = {
  name: "amp: removeProhibitedClassNames",
  test: ({ node }) =>
    node.props?.className?.split(" ").some((clz) => clz.startsWith("-amp")) ||
    node.props?.className?.split(" ").some((clz) => clz.startsWith("i-amp")),
  processor: ({ node }) => {
    node.props.className = node.props.className
      .split(" ")
      .filter((clz) => !clz.startsWith("-amp"))
      .filter((clz) => !clz.startsWith("i-amp"))
      .join(" ");
    return node;
  },
};
