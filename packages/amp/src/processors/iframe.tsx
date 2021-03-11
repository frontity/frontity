import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

/**
 * Props for the {@link AMPIframe} component.
 */
interface IFrameProps {
  /**
   * Title for the iframe.
   */
  title: string;

  /**
   * Src of the iframe element.
   */
  src: string;

  /**
   * Height of the iframe. Typically should be set in the WordPress content.
   */
  height: string;
}

/**
 * The component that renders an amp-iframe component in place of a regular
 * iframe and adds the required AMP script for amp-iframe in the head.
 *
 * @param props - The props to pass the the amp-iframe.
 *
 * @returns A react component.
 */
const AMPIframe: React.FC<IFrameProps> = ({ title, src, height, ...rest }) => {
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
      <amp-iframe
        {...rest}
        title={title || ""}
        src={src}
        layout="fixed-height"
        height={parseInt(height, 10) || 150} // This is mimicking the browser default of 150px
      />
    </>
  );
};

export const iframe: Processor<Element, Packages> = {
  name: "amp-iframe",
  test: ({ node }) => node.component === "iframe",
  processor: ({ node }) => {
    node.component = AMPIframe;

    // AMP requires that the iframe is loaded over HTTPS
    const httpRegexp = /^http:\/\//;
    if (node.props.src.match(httpRegexp)) {
      node.props.src = node.props.src.replace(httpRegexp, "https://");
    }

    return node;
  },
};
