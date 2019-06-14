import React from "react";
import TestRenderer from "react-test-renderer";
import Image from "../image";

describe("Image", () => {
  test("works just fine", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    const result = TestRenderer.create(<Image {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
