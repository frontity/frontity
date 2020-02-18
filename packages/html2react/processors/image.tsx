import React, { ReactNode } from "react";
import { styled } from "frontity";
import Image, { Props as ImageProps } from "@frontity/components/image";
import { Processor } from "../types";

type Props = ImageProps & {
  width: string;
  height: string;
  children: ReactNode;
};

const ContentImage: React.FC<Props> = props => {
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

const image: Processor = {
  test: node => node.type === "element" && node.component === "img",
  process: node => {
    if (node.type === "element") {
      if (node.parent && node.parent.component === "noscript") return null;

      if (node.props["data-src"]) {
        node.props.src = node.props["data-src"];
      }
      if (node.props["data-srcset"]) {
        node.props.srcSet = node.props["data-srcset"];
      }
      node.component = ContentImage;
    }

    return node;
  }
};

export default image;

const Container = styled.span`
  display: block;
  position: relative;
  padding-bottom: ${({ height, width }: { height: string; width: string }) =>
    (parseInt(height, 10) / parseInt(width, 10)) * 100}%;

  noscript > img,
  img {
    position: absolute;
    height: 100%;
  }
`;
