import React from "react";
import { styled } from "frontity";
import { Element, Processor } from "../../types";

const Image: React.FC = props => <Img {...props} />;

const Img = styled.img`
  border: 5px solid pink;
`;

const processor: Processor = {
  name: "frontity-image",
  priority: 5,
  test: node => node.type === "element" && node.component === "img",
  process: (node: Element) => {
    console.log("running `frontity-image` with priority 5");
    node.component = Image;
    return node;
  }
};

export default processor;
