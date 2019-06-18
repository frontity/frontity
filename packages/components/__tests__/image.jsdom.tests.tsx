/**
 * @jest-environment jsdom
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { Head } from "frontity";
import Image from "../image";

describe("Image", () => {
  beforeEach(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: jest.fn()
    });
    Object.defineProperty(HTMLImageElement.prototype, "loading", {
      writable: true,
      value: undefined
    });
  });

  test("works with native lazy load", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy"
    };

    (HTMLImageElement as any).prototype.loading = "loading";

    const result = TestRenderer.create(<Image {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  test("works with `IntersectionObserver`", () => {
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

  test("works without `IntersectionObserver`", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    IntersectionObserver = undefined;

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    const head = Head.peek();

    expect(image).toMatchSnapshot();
    // For some reason Head doesn't behave the same in Node than in JSDOM.
    expect((head as any).scriptTags).toMatchSnapshot();
    expect((head as any).noscriptTags).toMatchSnapshot();
  });
});
