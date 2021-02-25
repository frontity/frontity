import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

/**
 * The component that renders an amp-audio component in place of a regular
 * audio and adds the required AMP script for amp-audio in the head.
 *
 * @param props - The props to pass the the amp-audio.
 *
 * @returns A react component.
 */
const AMPAudio = (props: any) => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-audio"
          src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
        />
      </Head>
      <amp-audio {...props} />
    </>
  );
};

export const audio: Processor<Element, Packages> = {
  name: "amp-audio",
  test: ({ node }) => node.type === "element" && node.component === "audio",
  processor: ({ node }) => {
    node.component = AMPAudio;
    return node;
  },
};
