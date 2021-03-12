import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

/**
 * Props for the image element as processed by {@link img}.
 */
export type ImgElement = Element & {
  /**
   * Props.
   */
  props: {
    /**
     * CSS classes.
     */
    class: string;

    /**
     * Loading prop that normally is set on the img component by WordPress.
     */
    loading: boolean;

    /**
     * Layout - refers to AMP layout parameter.
     */
    layout: string;
  };
};

export const img: Processor<ImgElement, Packages> = {
  name: "amp-img",
  priority: 9, // because it should run before the image processor from html2react
  test: ({ node }) => node.component === "img",
  processor: ({ node }) => {
    // amp-img does not support nor need that prop.
    delete node.props.loading;

    // Explicitly set layout
    node.props.layout = "responsive";

    node.component = "amp-img";

    return node;
  },
};
