import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

/**
 * Props for {@link AMPYoutube} component.
 */
interface AMPYoutubeProps {
  /**
   * The ID of the youtube video.
   */
  videoId: string;

  /**
   * Width.
   */
  width: string;

  /**
   * Height.
   */
  height: string;

  /**
   * Layout.
   */
  layout: string;

  /**
   * Title.
   */
  title: string;
}

/**
 * The component that renders an amp-youtube component instead of the regular
 * embed provided by WordPress.
 *
 * @param props - The props to pass to amp-youtube.
 *
 * @returns A react component.
 */
const AMPYoutube: React.FC<AMPYoutubeProps> = ({
  videoId,
  width,
  height,
  layout,
  title,
}) => {
  return (
    <>
      <Head>
        <script
          // We have to explicitly pass undefined, otherwise the attribute is
          // passed to the DOM like async="true" and AMP does not allow that.
          async={undefined}
          custom-element="amp-youtube"
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
        />
      </Head>
      <amp-youtube
        width={width}
        height={height}
        layout={layout}
        title={title}
        data-videoid={videoId}
      />
    </>
  );
};

export const youtube: Processor<Element, Packages> = {
  name: "amp-youtube",
  priority: 8, // because it should run before the iframe processor and the amp-iframe processor
  test: ({ node }) =>
    node.component === "iframe" &&
    (/youtube.com/.test(node.props.src) ||
      /youtube.com/.test(node.props["data-src"])),
  processor: ({ node }) => {
    if (!node.props.src) node.props.src = node.props["data-src"];

    const match =
      node.props?.src.match(/\/embed\/([\d\w-]+)/) ||
      node.props?.src.match(/\/([\d\w-]+?)\?/);

    node.props["videoId"] = match ? match[1] : null;

    if (node.props["data-origwidth"] && node.props["data-origheight"]) {
      node.props.height = node.props["data-origheight"];
      node.props.width = node.props["data-origwidth"];
      node.props["layout"] = "responsive";
    }

    node.component = AMPYoutube;

    return node;
  },
};
