import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { img as imgProcessor } from "./img";
import type { ImgElement } from "./img";

export const picture: Processor<ImgElement, Packages> = {
  name: "amp: replace picture with amp-img",
  test: ({ node }) =>
    node.component === "picture" &&
    Boolean(node.children.find((node: Element) => node.component === "img")),
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
