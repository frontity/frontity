/* eslint-disable no-global-assign */
/**
 * @jest-environment jsdom
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import * as useInView from "@frontity/hooks/use-in-view";
import Image from "../image";

jest.mock("@frontity/hooks/use-in-view", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Image", () => {
  const mockedUseInView = useInView.default as jest.MockedFunction<
    typeof useInView.default
  >;

  beforeEach(() => {
    delete (HTMLImageElement as any).prototype.loading;
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    mockedUseInView.mockReset();
  });

  test('works when loading === "eager"', () => {
    const loading: "lazy" | "eager" = "eager";
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading,
    };

    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: false,
      supported: true,
    });

    const result = TestRenderer.create(<Image {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  test("works with native lazy load and component did not mount", () => {
    (HTMLImageElement as any).prototype.loading = true;

    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: false,
      supported: true,
    });

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      height: 300,
      state: { frontity: { rendering: "ssr" } },
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with native lazy load and component did mount", () => {
    (HTMLImageElement as any).prototype.loading = true;

    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: false,
      supported: true,
    });

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      height: 300,
      state: { frontity: { rendering: "csr" } },
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver if `height` prop is not specified", () => {
    (HTMLImageElement as any).prototype.loading = true;
    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: false,
      supported: true,
    });

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` and is out of view", () => {
    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: false,
      supported: true,
    });
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` and is in view", () => {
    mockedUseInView.mockReturnValue({
      ref: () => {},
      inView: true,
      supported: true,
    });
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works without `IntersectionObserver` and component did not mount", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      state: { frontity: { rendering: "ssr" } },
    };

    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchSnapshot();
  });

  test("works without `IntersectionObserver` and component did mount", () => {
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      state: { frontity: { rendering: "csr" } },
    };

    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchSnapshot();
  });
});
