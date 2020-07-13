import Link from "@frontity/components/link";
import { Processor, Element } from "../types";

const links: Processor<Element> = {
  priority: 20,
  name: "links",
  test: ({ node }) => node.component === "a",
  processor: ({ node }) => {
    node.component = Link;

    return node;
  },
};

export default links;
