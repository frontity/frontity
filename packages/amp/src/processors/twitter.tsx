import { Processor, Element, Node } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { Head } from "frontity";

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

/**
 *
 */
interface AMPTweetProps {
  /**
   *
   */
  tweetId: string;
}

/**
 * @param root0
 */
const AMPTweet = ({ tweetId }) => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-twitter"
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
        />
      </Head>
      <Container
        styles={{ height, width }}
        ref={(node) => {
          this.ref = node;
        }}
      >
        <amp-twitter
          height={1}
          width={1}
          layout="responsive"
          data-tweetid={tweetId}
        />
      </Container>
    </>
  );
};

export const twitter: Processor<Element, Packages> = {
  test: ({ node }) =>
    node.type === "element" &&
    node.component === "blockquote" &&
    (node.props?.className?.split(" ").includes("twitter-tweet") ||
      node.props?.className?.split(" ").includes("twitter-video")),
  processor: ({ node }) => {
    return node;
  },
};
