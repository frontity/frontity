import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { img as imgProcessor } from "./img";
import type { ImgElement } from "./img";

export const picture: Processor<ImgElement, Packages> = {
  name: "amp-img",
  test: ({ node }) =>
    node.type === "element" &&
    node.component === "picture" &&
    Boolean(node.children.find((node: Element) => node.component === "img")),
  priority: 1,
  processor: ({ node, ...rest }) => {
    const img = node.children.find(
      (node: ImgElement) => node.component === "img"
    ) as ImgElement;

    node.props = img.props;
    node = imgProcessor.processor({ node, ...rest }) as ImgElement;

    // Remove any descendants
    delete node.children;

    return node;
  },
};
