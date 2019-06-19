/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { Head } from "frontity";
import Image from "../components/image";

describe("Image", () => {
  test("works on server", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    const head = Head.peek();

    expect(image).toMatchSnapshot();
    expect(head.script.toString()).toMatchSnapshot();
    expect(head.noscript.toString()).toMatchSnapshot();
  });
});
