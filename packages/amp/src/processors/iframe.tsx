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
const AmpIframe = (props: any) => {
  return (
    <>
      <Head>
        <script
          // We have to explicitly pass undefined, otherwise the attribute is
          // passed to the DOM like async="true" and AMP does not allow that.
          async={undefined}
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
      </Head>
      <amp-iframe {...props} />
    </>
  );
};

export const iframe: Processor<Element, Packages> = {
  name: "amp-iframe",
  test: ({ node }) => node.type === "element" && node.component === "iframe",
  processor: ({ node }) => {
    node.component = AmpIframe;

    // AMP requires that the iframe is loaded over HTTPS
    const httpRegexp = /^http:\/\//;
    if (node.props.src.match(httpRegexp)) {
      node.props.src = node.props.src.replace(httpRegexp, "https://");
    }

    return node;
  },
};
