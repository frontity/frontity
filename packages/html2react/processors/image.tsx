import React from "react";
import { styled } from "frontity";
import Image from "@frontity/components/image";
import { Processor, Element } from "../types";

const image: Processor = {
  test: node => node.type === "element" && node.component === "img",
  process: (node: Element) => {
    node.component = ContentImage;
    return node;
  }
};

export default image;

const ContentImage: React.FC<any> = props => {
  if (props.width && props.height) {
    return (
      <Container height={props.height} width={props.width}>
        <Image {...props} />
      </Container>
    );
  } else {
    return <Image {...props} />;
  }
};

const Container = styled.span`
  display: block;
  position: relative;
  padding-bottom: ${({ height, width }: { height: string; width: string }) =>
    (parseInt(height, 10) / parseInt(width, 10)) * 100}%;

  noscript > img,
  img {
    position: absolute;
  }
`;
