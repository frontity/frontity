import { Processor } from "../types";
import Tweet from "@frontity/components/tweet";

const tweet: Processor = {
  test: ({ node }) =>
    node.type === "element" &&
    node.component === "blockquote" &&
    (node.props.className.split(" ").includes("twitter-tweet") ||
      node.props.className.split(" ").includes("twitter-video")),
  priority: 10,
  name: "tweet",
  processor: ({ node }) => {
    if (node.type === "element") {
      //Remove the <script> element next to the <blockquote>
      const index = node.parent.children.indexOf(node);
      if (node.parent.children[index + 1]["component"] === "script") {
        node.parent.children.splice(index + 1, 1);
      }

      node.component = Tweet;
    }

    return node;
  },
};

export default tweet;
