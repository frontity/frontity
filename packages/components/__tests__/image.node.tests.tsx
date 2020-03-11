/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { FilledContext } from "react-helmet-async";
import Image from "../image";

describe("Image", () => {
  test('It\'s a normal image if loading === "eager"', () => {
    const loading: "lazy" | "eager" = "eager";
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading
    };

    const image = TestRenderer.create(<Image {...props} />).toJSON();

    expect(image).toMatchSnapshot();
  });

  test("works on server (without height)", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    const helmetContext = {} as FilledContext;
    const image = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <Image {...props} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(image).toMatchSnapshot();
    expect(head.script.toString()).toMatchSnapshot();
    expect(head.noscript.toString()).toMatchSnapshot();
  });

  test("works on server (with height)", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      height: 300
    };

    const helmetContext = {} as FilledContext;
    const image = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <Image {...props} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(image).toMatchSnapshot();
    expect(head.script.toString()).toMatchSnapshot();
    expect(head.noscript.toString()).toMatchSnapshot();
  });
});
