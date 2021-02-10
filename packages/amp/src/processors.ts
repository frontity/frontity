import { Processor, Element } from "@frontity/html2react/types";

const image: Processor<Element> = {
  test: ({ node }) => node.component === "img",
  processor: ({ node }) => {
    return node;
  },
};

const processors = [image];

export default processors;
