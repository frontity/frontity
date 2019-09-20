import React from "react";
import { styled, css } from "frontity";
import Image from "@frontity/components/image";
import Package from "../types";

import icelandTest from "../static/images/Iceland-test.jpg";
import icelandTest300x182 from "../static/images/Iceland-test-300x182.jpg";
import icelandTest768x465 from "../static/images/Iceland-test-768x465.jpg";
import icelandTest1024x620 from "../static/images/Iceland-test-1024x620.jpg";
import icelandTest1200x726 from "../static/images/Iceland-test-1200x726.jpg";

import japan from "../static/images/japan.jpg";
import japan300x200 from "../static/images/japan-300x200.jpg";
import japan768x512 from "../static/images/japan-768x512.jpg";
import japan1024x683 from "../static/images/japan-1024x683.jpg";
import japan1200x800 from "../static/images/japan-1200x800.jpg";

const Root: React.FC = () => (
  <>
    <Image
      className="first"
      alt="iceland"
      src={icelandTest}
      srcSet={[
        `${icelandTest300x182} 300w`,
        `${icelandTest768x465} 768w`,
        `${icelandTest1024x620} 1024w`,
        `${icelandTest1200x726} 1200w`
      ].join(", ")}
      sizes="100vw"
    />
    <Image
      className="second"
      css={css`margin-top 3000px;`}
      height={200}
      alt=""
      src="https://test.frontity.io/wp-content/uploads/2016/11/japan.jpg"
      srcSet={[
        "https://test.frontity.io/wp-content/uploads/2016/11/japan-300x200.jpg   300w",
        "https://test.frontity.io/wp-content/uploads/2016/11/japan-768x512.jpg   768w",
        "https://test.frontity.io/wp-content/uploads/2016/11/japan-1024x683.jpg 1024w",
        "https://test.frontity.io/wp-content/uploads/2016/11/japan-1200x800.jpg 1200w"
      ].join(", ")}
      sizes="100vw"
    />
    <Image
      className="third"
      height={200}
      css={css`margin-top 3000px;`}
      alt="canyon"
      src="https://test.frontity.io/wp-content/uploads/2016/11/canyon.jpg"
      srcSet={[
        "https://test.frontity.io/wp-content/uploads/2016/11/canyon-300x200.jpg   300w",
        "https://test.frontity.io/wp-content/uploads/2016/11/canyon-768x512.jpg   768w",
        "https://test.frontity.io/wp-content/uploads/2016/11/canyon-1024x683.jpg 1024w",
        "https://test.frontity.io/wp-content/uploads/2016/11/canyon-1200x800.jpg 1200w"
      ].join(", ")}
      sizes="100vw"
    />
    <Image
      className="fourth"
      css={css`margin-top 3000px;`}
      height={200}
      alt="sunrise-phu-quoc-island-ocean"
      src="https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean-300x198.jpg"
      srcSet={[
        "https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean-300x198.jpg   300w",
        "https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean-768x506.jpg   768w",
        "https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean-1024x675.jpg 1024w",
        "https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean-1200x791.jpg 1200w",
        "https://test.frontity.io/wp-content/uploads/2016/11/sunrise-phu-quoc-island-ocean.jpg          1280w"
      ].join(", ")}
      sizes="100vw"
    />
  </>
);

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
