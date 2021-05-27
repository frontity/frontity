import * as React from "react";
import { styled } from "frontity";
import Image, { Props as ImageProps } from "@frontity/components/image";
import { Processor, Element } from "../types";

/**
 * Props for the {@link ContentImage} component.
 */
type Props = ImageProps & {
  /**
   * Width.
   */
  width: string;

  /**
   * Height.
   */
  height: string;
};

/**
 * Type for the Element processed by the {@link image} processor.
 */
interface ImageElement extends Element {
  /**
   * Props.
   */
  props: Element["props"] & ImageProps;
}

/**
 * A wrapper around the Image component.
 * If width and height are passed as props, wraps the Image with a {@link Container}.
 *
 * @param props - Defined in {@link Props}.
 *
 * @returns A React component.
 */
const ContentImage: React.FC<Props> = (props) => {
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

const image: Processor<ImageElement> = {
  name: "image",
  test: ({ node }) => node.component === "img",
  processor: ({ node }) => {
    if (node.parent?.component === "noscript") return null;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    if (node.props["data-srcset"]) {
      node.props.srcSet = node.props["data-srcset"];
    }

    node.component = ContentImage;

    return node;
  },
};

export default image;

/**
 * Props for the {@link Container}.
 */
interface ImgContainerProps {
  /**
   * Height.
   */
  height: string;

  /**
   * Width.
   */
  width: string;
}

const Container = styled.span<ImgContainerProps>`
  display: block;
  position: relative;
  padding-bottom: ${({ height, width }) =>
    (parseInt(height, 10) / parseInt(width, 10)) * 100}%;

  noscript > img,
  img {
    position: absolute;
    height: 100%;
  }
`;
