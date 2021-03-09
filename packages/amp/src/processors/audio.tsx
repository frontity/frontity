import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head, warn } from "frontity";

/**
 * The component that renders an amp-audio component in place of a regular
 * audio and adds the required AMP script for amp-audio in the head.
 *
 * @param props - The props to pass the the amp-audio.
 *
 * @returns A react component.
 */
const AMPAudio = (props: any) => (
  <>
    <Head>
      <script
        // We have to explicitly pass undefined, otherwise the attribute is
        // passed to the DOM like async="true" and AMP does not allow that.
        async={undefined}
        custom-element="amp-audio"
        src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
      />
    </Head>
    <amp-audio {...props} controls />
  </>
);

export const audio: Processor<Element, Packages> = {
  name: "amp-audio",
  test: ({ node }) => node.type === "element" && node.component === "audio",
  processor: ({ node }) => {
    node.component = AMPAudio;

    // AMP requires that the file is loaded over HTTPS
    const httpRegexp = /^http:\/\//;
    if (node.props.src.match(httpRegexp)) {
      node.props.src = node.props.src.replace(httpRegexp, "https://");

      warn(
        `An audio element with src of ${node.props.src} was found but AMP requires resources to be loaded over HTTPS.\n
Frontity will update the src attribute to point to the HTTPS version but you need to ensure that the asset is available over HTTPS.`
      );
    }

    return node;
  },
};
