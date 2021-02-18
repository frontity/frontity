import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

/**
 * The component that renders an amp-iframe component in place of a regular
 * iframe and adds the required AMP script for amp-iframe in the head.
 *
 * @param props - The props to pass the the amp-iframe.
 *
 * @returns A react component.
 */
const AMPiframe = (props) => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
      </Head>
      <amp-iframe {...props} />
    </>
  );
};

export const iframe: Processor<Element, Packages> = {
  test: ({ node }) => node.type === "element" && node.component === "iframe",
  processor: ({ node }) => {
    node.component = AMPiframe;
    return node;
  },
};
