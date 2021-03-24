import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";

export const removeProhibitedIds: Processor<Element, Packages> = {
  name: "amp: removeProhibitedIds",
  test: ({ node }) =>
    node.props?.id?.startsWith("-amp") || node.props?.id?.startsWith("i-amp"),
  processor: ({ node }) => {
    delete node.props.id;
    return node;
  },
};
