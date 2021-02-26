import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

/**
 * The component that renders an amp-video component in place of a regular
 * video and adds the required AMP script for amp-video in the head.
 *
 * @param props - The props to pass the the amp-video.
 *
 * @returns A react component.
 */
const AMPVideo = (props: any) => {
  return (
    <>
      <Head>
        <script
          // We have to explicitly pass undefined, otherwise the attribute is
          // passed to the DOM like async="true" and AMP does not allow that.
          async={undefined}
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
      </Head>
      <amp-video {...props} />
    </>
  );
};

export const video: Processor<Element, Packages> = {
  name: "amp-video",
  test: ({ node }) => node.type === "element" && node.component === "video",
  processor: ({ node }) => {
    node.component = AMPVideo;

    // AMP requires that the file is loaded over HTTPS
    const httpRegexp = /^http:\/\//;
    if (node.props.src.match(httpRegexp)) {
      node.props.src = node.props.src.replace(httpRegexp, "https://");
    }
    return node;
  },
};
