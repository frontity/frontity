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
          async
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
      </Head>
      <amp-video {...props} />
    </>
  );
};

export const video: Processor<Element, Packages> = {
  test: ({ node }) => node.type === "element" && node.component === "video",
  processor: ({ node }) => {
    node.component = AMPVideo;
    return node;
  },
};
