/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-global-assign */

/**
 * @jest-environment jsdom
 */

import TestRenderer from "react-test-renderer";
import Image from "../image";

jest.mock("@frontity/hooks/use-in-view", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock only useConnect in the 'frontity' module
jest.mock("frontity", () => ({
  // @ts-ignore
  ...jest.requireActual("frontity"),
  useConnect: () => ({
    state: {
      frontity: {
        mode: "html",
      },
    },
  }),
}));

describe("Image", () => {
  test('works when loading === "eager"', () => {
    const props: React.ImgHTMLAttributes<HTMLImageElement> = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "eager",
    };

    const result = TestRenderer.create(<Image {...props} />).toJSON();
    expect(result).toMatchInlineSnapshot(`
      <img
        alt="Some fake alt text"
        className="frontity-lazy-image fake-class-name"
        loading="eager"
        src="https://fake-src.com/fake-image.jpg"
        srcSet="https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w"
      />
    `);
  });

  test('works when loading === "lazy"', () => {
    const props: React.ImgHTMLAttributes<HTMLImageElement> = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy",
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchInlineSnapshot(`
      <img
        alt="Some fake alt text"
        className="frontity-lazy-image fake-class-name"
        loading="lazy"
        src="https://fake-src.com/fake-image.jpg"
        srcSet="https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w"
      />
    `);
  });
});
