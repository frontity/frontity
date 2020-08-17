import React from "react";
import { Global, css, styled } from "frontity";
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

/**
 * A React component that displays an iceland image.
 *
 * @param className - The class.
 * @param styles - The styles, in `css` prop format.
 *
 * @returns The iceland image with some class and styles.
 */
const ImgIceland = ({ className, styles }) => (
  <Image
    className={className}
    css={styles}
    height={200}
    alt="iceland"
    src={iceland}
    srcSet={[
      `${iceland300x182} 300w`,
      `${iceland768x465} 768w`,
      `${iceland1024x620} 1024w`,
      `${iceland1200x726} 1200w`,
    ].join(", ")}
    sizes="100vw"
  />
);

/**
 * A React component that displays an japan image.
 *
 * @param className - The class.
 * @param styles - The styles, in `css` prop format.
 *
 * @returns The japan image with some class and styles.
 */
const ImgJapan = ({ className, styles }) => (
  <Image
    className={className}
    css={styles}
    alt="japan"
    src={japan}
    srcSet={[
      `${japan300x200} 300w`,
      `${japan768x512} 768w`,
      `${japan1024x683} 1024w`,
      `${japan1200x800} 1200w`,
    ].join(", ")}
    sizes="100vw"
  />
);

/**
 * A React component that displays an canyon image.
 *
 * @param className - The class.
 * @param styles - The styles, in `css` prop format.
 *
 * @returns The canyon image with some class and styles.
 */
const ImgCanyon = ({ className, styles }) => (
  <Image
    className={className}
    css={styles}
    height={200}
    alt="canyon"
    src={canyon}
    srcSet={[
      `${canyon300x200} 300w`,
      `${canyon768x512} 768w`,
      `${canyon1024x683} 1024w`,
      `${canyon1200x800} 1200w`,
    ].join(", ")}
    sizes="100vw"
  />
);

/**
 * A React component that displays an phuquoc image.
 *
 * @param className - The class.
 * @param styles - The styles, in `css` prop format.
 *
 * @returns The phuquoc image with some class and styles.
 */
const ImgPhuQuoc = ({ className, styles }) => (
  <Image
    className={className}
    css={styles}
    height={200}
    alt="phu-quoc"
    src={phuQuoc}
    srcSet={[
      `${phuQuoc300x198} 300w`,
      `${phuQuoc768x506} 768w`,
      `${phuQuoc1024x675} 1024w`,
      `${phuQuoc1200x791} 1200w`,
    ].join(", ")}
    sizes="100vw"
  />
);

/**
 * A React component that contains all the images to be tested when scrolling.
 *
 * @returns React element.
 */
const Root: React.FC = () => (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
        }
      `}
    />
    <Container>
      <ImgIceland
        className="top left"
        styles={css`
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 300px;
          height: auto;
        `}
      />
      <ImgJapan
        className="bottom left"
        styles={css`
          position: absolute;
          display: block;
          bottom: 0;
          left: 0;
          width: 300px;
          height: auto;
        `}
      />
      <ImgCanyon
        className="top right"
        styles={css`
          position: absolute;
          display: block;
          top: 0;
          right: 0;
          width: 300px;
          height: auto;
        `}
      />
      <ImgPhuQuoc
        className="bottom right"
        styles={css`
          position: absolute;
          display: block;
          bottom: 0;
          right: 0;
          width: 300px;
          height: auto;
        `}
      />
    </Container>
  </>
);

const Container = styled.div`
  position: relative;
  width: 5000px;
  height: 5000px;
`;

const ImagePackage: Package = {
  roots: {
    image: Root,
  },
};

export default ImagePackage;
