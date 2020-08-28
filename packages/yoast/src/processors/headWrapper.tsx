import { Head } from "frontity";
import { Processor, Element } from "@frontity/html2react/types";

const headWrapper: Processor<Element> = {
  /**
   * Check that this is the first node of the HTML tree.
   *
   * @param payload - Test function payload.
   * @returns `true` if this is the first node, `false` otherwise.
   */
  test: ({ node, root }) => node === root[0],

  /**
   * Wrap all nodes into a `<Head>` element (see {@link Head}).
   *
   * @param payload - Processor function payload.
   * @returns `<Head>` element containing all nodes.
   */
  processor: ({ node, root }) => {
    // Copy all props from this node.
    const firstNode = { ...node };

    // Get all other nodes.
    const otherNodes = root.slice(1);

    // Transform the current node into the `<Head>` component.
    node.type = "element";
    node.props = {};
    node.component = Head;

    // Change the root element so it only contains the `<Head>` component.
    root.splice(0, root.length, node);

    // Append all nodes into `<Head>`'s children.
    node.children = [firstNode, ...otherNodes];

    return node;
  },
};

export default headWrapper;
