import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

export const img: Processor<Element, Packages> = {
  test: ({ node }) => node.type === "element" && node.component === "img",
  processor: ({ node }) => {
    node.component = "amp-img";
    return node;
  },
};
