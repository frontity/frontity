import React from "react";
import { css, styled } from "frontity";
import Image from "@frontity/components/image";
import Package from "../types";

import iceland from "../static/images/Iceland-test.jpg";
import iceland300x182 from "../static/images/Iceland-test-300x182.jpg";
import iceland768x465 from "../static/images/Iceland-test-768x465.jpg";
import iceland1024x620 from "../static/images/Iceland-test-1024x620.jpg";
import iceland1200x726 from "../static/images/Iceland-test-1200x726.jpg";

import japan from "../static/images/japan.jpg";
import japan300x200 from "../static/images/japan-300x200.jpg";
import japan768x512 from "../static/images/japan-768x512.jpg";
import japan1024x683 from "../static/images/japan-1024x683.jpg";
import japan1200x800 from "../static/images/japan-1200x800.jpg";

import canyon from "../static/images/canyon.jpg";
import canyon300x200 from "../static/images/canyon-300x200.jpg";
import canyon768x512 from "../static/images/canyon-768x512.jpg";
import canyon1024x683 from "../static/images/canyon-1024x683.jpg";
import canyon1200x800 from "../static/images/canyon-1200x800.jpg";

import phuQuoc from "../static/images/sunrise-phu-quoc-island-ocean.jpg";
import phuQuoc300x198 from "../static/images/sunrise-phu-quoc-island-ocean-300x198.jpg";
import phuQuoc768x506 from "../static/images/sunrise-phu-quoc-island-ocean-768x506.jpg";
import phuQuoc1024x675 from "../static/images/sunrise-phu-quoc-island-ocean-1024x675.jpg";
import phuQuoc1200x791 from "../static/images/sunrise-phu-quoc-island-ocean-1200x791.jpg";

const ImgIceland = ({ className }) => (
  <Image
    className={className}
    alt="iceland"
    src={iceland}
    srcSet={[
      `${iceland300x182} 300w`,
      `${iceland768x465} 768w`,
      `${iceland1024x620} 1024w`,
      `${iceland1200x726} 1200w`
    ].join(", ")}
    sizes="100vw"
  />
);

const ImgJapan = ({ className }) => (
  <Image
    className={className}
    height={200}
    alt="japan"
    src={japan}
    srcSet={[
      `${japan300x200} 300w`,
      `${japan768x512} 768w`,
      `${japan1024x683} 1024w`,
      `${japan1200x800} 1200w`
    ].join(", ")}
    sizes="100vw"
  />
);

const ImgCanyon = ({ className }) => (
  <Image
    className={className}
    height={200}
    alt="canyon"
    src={canyon}
    srcSet={[
      `${canyon300x200} 300w`,
      `${canyon768x512} 768w`,
      `${canyon1024x683} 1024w`,
      `${canyon1200x800} 1200w`
    ].join(", ")}
    sizes="100vw"
  />
);

const ImgPhuQuoc = ({ className }) => (
  <Image
    className={className}
    height={200}
    alt="phu-quoc"
    src={phuQuoc}
    srcSet={[
      `${phuQuoc300x198} 300w`,
      `${phuQuoc768x506} 768w`,
      `${phuQuoc1024x675} 1024w`,
      `${phuQuoc1200x791} 1200w`
    ].join(", ")}
    sizes="100vw"
  />
);

const Root: React.FC = () => (
  <Container>
    <Column>
      <ImgIceland className="top left" />
      <VSpace />
      <ImgJapan className="bottom left" />
    </Column>
    <HSpace />
    <Column>
      <ImgCanyon className="top right" />
      <VSpace />
      <ImgPhuQuoc className="bottom right" />
    </Column>
  </Container>
);

const Container = styled.div`
  width: 2000px;
  position: relative;
`;

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const HSpace = styled.div`
  display: inline-block;
  width: 1000px;
  vertical-align: top;
`;

const VSpace = styled.div`
  height: 1000px;
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
