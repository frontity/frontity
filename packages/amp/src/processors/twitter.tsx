import { Processor, Element, Node } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head, styled } from "frontity";

/**
 * This function iterates the element object recursively until it finds an
 * 'element' with component 'a' and its 'href' attribute matches a RegExp that
 * captures a tweet ID.
 *
 * @param children - An array of elements.
 *
 * @returns The string corresponding to the tweet ID.
 */
export const getTweetId = (children: Node[]): string => {
  if (!children) return "";

  const results = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.type === "element" && child.component === "a") {
      const match = child.props.href.match(/\/status\/(\d+)/);
      if (match) return match[1];
    }
    if (child.type === "element" && child.children)
      results.push(getTweetId(child.children));
  }
  return results.reduce((result, current) => current || result, "");
};

const Container = styled("div", {
  shouldForwardProp: (prop: string) => !["width", "height"].includes(prop),
})`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 170px;
  margin: 15px 0;

  blockquote {
    margin: 0;
  }
`;

/**
 * Wrapper component for amp-tweet.
 *
 * @param props - Defined in {@link AMPTwitterProps}.
 *
 * @returns A react compoent.
 */
const AMPTwitter: React.FC<{
  /**
   * The ID of the tweet.
   */
  tweetId: string;
}> = ({ tweetId }) => {
  return (
    <>
      <Head>
        <script
          async={undefined}
          custom-element="amp-twitter"
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
        />
      </Head>
      <Container>
        <amp-twitter
          // When used together with layout="responsive", it does not mean that the
          // element will have a specific height & width but rather that it will scale
          // responsively preserving the aspect ratio between the height and width.
          height={1}
          width={1}
          placeholder={undefined}
          layout="responsive"
          data-tweetid={tweetId}
        />
      </Container>
    </>
  );
};

/**
 * Interface for twitter element to be processed.
 */
interface TwitterElement extends Element {
  /**
   * Props.
   */
  props: {
    /**
     * The ID of the tweet!
     */
    tweetId: string;
  } & Element["props"];
}

export const twitter: Processor<TwitterElement, Packages> = {
  test: ({ node }) =>
    node.props?.className?.split(" ").includes("twitter-tweet") ||
    node.props?.className?.split(" ").includes("twitter-video"),
  processor: ({ node }) => {
    node.component = AMPTwitter;
    node.props.tweetId = getTweetId(node.children);

    return node;
  },
};
