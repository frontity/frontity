import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

/**
 * Props for the image element as processed by {@link img}.
 */
type ImgElement = Element & {
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
  test: ({ node }) => node.component === "img",
  processor: ({ node }) => {
    // Because amp-* component are custom components, we have to pass the
    // class as `class` and not as `className`:
    // https://reactjs.org/docs/web-components.html#using-web-components-in-react
    node.props.class = node.props?.className;

    // We can now safely remove the className prop.
    delete node.props.className;

    // amp-img does not support nor need that prop.
    delete node.props.loading;

    // Explicitly set layout
    node.props.layout = "responsive";

    node.component = "amp-img";

    return node;
  },
};
