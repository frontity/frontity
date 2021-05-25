/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import Image from "../image";

// Mock only useConnect in the 'frontity' module
jest.mock("frontity", () => ({
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
  test('It\'s a normal image if loading === "eager"', () => {
    const loading: "lazy" | "eager" = "eager";
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading,
    };

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchInlineSnapshot(`
      <img
        alt="Some fake alt text"
        className="frontity-lazy-image fake-class-name"
        loading="eager"
        src="https://fake-src.com/fake-image.jpg"
        srcSet="https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w"
      />
    `);
  });

  test("works on server (without height)", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
    };

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchInlineSnapshot(`
      <img
        alt="Some fake alt text"
        className="frontity-lazy-image fake-class-name"
        loading="lazy"
        src="https://fake-src.com/fake-image.jpg"
        srcSet="https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w"
      />
    `);
  });

  test("works on server (with height)", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      height: 300,
    };

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchInlineSnapshot(`
      <img
        alt="Some fake alt text"
        className="frontity-lazy-image fake-class-name"
        height={300}
        loading="lazy"
        src="https://fake-src.com/fake-image.jpg"
        srcSet="https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w"
      />
    `);
  });
});
