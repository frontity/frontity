import Link from "@frontity/components/link";
import { LinkProps } from "@frontity/components/link/types";

import { Processor, Element } from "../types";

/**
 * Types for Html2React Processor {@link links}.
 */
interface LinkElement extends Element {
  /**
   * The Props the React Component {@link Link} supports.
   */
  props: Element["props"] & LinkProps;
}

/**
 * A link processor that replaces all anchor tags with the {@link Link} component.
 *
 * The allows internal links within content to work with frontity's internal router.
 */
const link: Processor<LinkElement> = {
  priority: 10,
  name: "link",
  test: ({ node }) => node.component === "a",
  processor: ({ node }) => {
    if (node.props?.href && !node.props?.href?.startsWith("#")) {
      node.props.link = node.props.href;
    }

    node.component = Link;

    return node;
  },
};

export default link;
