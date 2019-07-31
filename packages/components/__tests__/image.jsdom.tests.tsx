/**
 * @jest-environment jsdom
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import * as useInView from "@frontity/hooks/use-in-view";
import * as useDidMount from "@frontity/hooks/use-did-mount";
import Image from "../image";

jest.mock("@frontity/hooks/use-in-view");
jest.mock("@frontity/hooks/use-did-mount");

describe("Image", () => {
  const mockedUseInView = useInView as jest.Mocked<typeof useInView>;
  const mockedUseDidMount = useDidMount as jest.Mocked<typeof useDidMount>;

  beforeEach(() => {
    delete (HTMLImageElement as any).prototype.loading;
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: jest.fn()
    });
  });

  afterEach(() => {
    mockedUseInView.default.mockReset();
    mockedUseDidMount.default.mockReset();
  });

  test('works when loading === "eager"', () => {
    const loading: "lazy" | "eager" | "auto" = "eager";
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading
    };

    const result = TestRenderer.create(<Image {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  test("works with native lazy load and component did not mount", () => {
    mockedUseDidMount.default.mockReturnValue(false);
    (HTMLImageElement as any).prototype.loading = true;

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy"
    };

    let result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with native lazy load and component did mount", () => {
    mockedUseDidMount.default.mockReturnValue(true);
    (HTMLImageElement as any).prototype.loading = true;

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name",
      loading: "lazy" as "lazy"
    };

    let result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` and is out of view", () => {
    mockedUseInView.default.mockReturnValue([false, undefined]);
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` and is in view", () => {
    mockedUseInView.default.mockReturnValue([true, undefined]);
    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    const result = TestRenderer.create(<Image {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works without `IntersectionObserver` and component did not mount", () => {
    mockedUseDidMount.default.mockReturnValue(false);

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    IntersectionObserver = undefined;

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchSnapshot();
  });

  test("works without `IntersectionObserver` and component did mount", () => {
    mockedUseDidMount.default.mockReturnValue(true);

    const props = {
      alt: "Some fake alt text",
      src: "https://fake-src.com/fake-image.jpg",
      srcSet:
        "https://fake-src.com/fake-image.jpg?w=300 300w, https://fake-src.com/fake-image.jpg?w=150 150w",
      className: "fake-class-name"
    };

    IntersectionObserver = undefined;

    const image = TestRenderer.create(<Image {...props} />).toJSON();
    expect(image).toMatchSnapshot();
  });
});
