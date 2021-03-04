/* eslint-disable jsdoc/require-jsdoc */

import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

type ImgElement = Element & {
  props: {
    class: string;
    loading: boolean;
    layout: string;
  };
};

export const img: Processor<ImgElement, Packages> = {
  name: "amp-img",
  test: ({ node }) => node.type === "element" && node.component === "img",
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
