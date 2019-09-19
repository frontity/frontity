import React from "react";
import { styled } from "frontity";
import Image from "@frontity/components/image";
import Package from "../types";

type ImageProps = Parameters<typeof Image>["0"];

const props: ImageProps = {
  alt: "gullfoss",
  src: "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss.jpg",
  srcSet: [
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss-150x150.jpg 150w",
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss-300x169.jpg 300w",
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss-768x433.jpg 768w",
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss-1024x577.jpg 1024w",
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss-1200x676.jpg 1200w",
    "https://test.frontity.io/wp-content/uploads/2016/11/Gullfoss.jpg 2000w"
  ].join(", ")
};

const Root: React.FC = () => (
  <>
    <Row>
      <StyledImg {...props} className="test-image-1" loading="lazy" />
      <StyledImg
        {...props}
        className="test-image-2"
        loading="lazy"
        height={100}
      />
    </Row>
  </>
);

const StyledImg = styled(Image)`
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
`;

const ImagePackage: Package = {
  name: "image",
  state: {},
  actions: {},
  roots: {
    image: Root
  },
  libraries: {}
};

export default ImagePackage;
