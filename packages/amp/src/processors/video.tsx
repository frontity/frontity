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
      {/* If we set controls={undefined} in order to satisfy the AMP validator, 
          the controls do not actually show up in the DOM */}
      <amp-video {...props} layout="responsive" controls />
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

    // For now if the video does not specify width & height we default to
    // a 9:16 aspect ratio.
    const width = node.props.width || node.props["data-origwidth"];
    const height = node.props.width || node.props["data-origheight"];
    if (parseInt(width, 10) > 0 && parseInt(height, 10) > 0) {
      node.props.width = width;
      node.props.height = height;
    } else {
      // When used together with layout="responsive", it does not mean that the
      // video will have a specific height & width but rather that it will scale
      // responsively preserving the aspect ratio between the height and width.
      node.props.height = 9;
      node.props.width = 16;
    }

    node.props["layout"] = "responsive";

    return node;
  },
};
