import { Head } from "frontity";
import { Processor, Element } from "@frontity/html2react/types";

const headTag: Processor<Element> = {
  // Check that this is the first node of the HTML tree.
  test: ({ node, root }) => node === root[0],
  processor: ({ node, root }) => {
    // Copy all props from this node.
    const firstNode = { ...node };

    // Get all other nodes.
    const otherNodes = root.slice(1);

    // Transform the current node into the `<Head>` component.
    node.type = "element";
    node.component = Head;
    node.props = {};

    // Change the root element so it only contains the `<Head>` component.
    root.splice(0, root.length, node);

    // Append all nodes into children.
    node.children = [firstNode, ...otherNodes];

    return node;
  },
};

export default headTag;
