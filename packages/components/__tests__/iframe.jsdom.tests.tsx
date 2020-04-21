/* eslint-disable no-global-assign */
/**
 * @jest-environment jsdom
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { useInView } from "react-intersection-observer";
import Iframe from "../iframe";

jest.mock("react-intersection-observer", () => ({
  __esModule: true,
  useInView: jest.fn(),
}));

describe("Iframe", () => {
  const mockedUseInView = useInView as jest.MockedFunction<typeof useInView>;

  beforeEach(() => {
    delete (HTMLIFrameElement as any).prototype.loading;
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
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      height: 500,
      loading,
    };

    const result = TestRenderer.create(<Iframe {...props} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  test("works with native lazy load and component did not mount", () => {
    (HTMLIFrameElement as any).prototype.loading = true;

    const props = {
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      height: 300,
      state: { frontity: { rendering: "ssr" } },
    };

    const result = TestRenderer.create(<Iframe {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with native lazy load and component did mount", () => {
    (HTMLIFrameElement as any).prototype.loading = true;

    const props = {
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      height: 300,
      state: { frontity: { rendering: "csr" } },
    };

    const result = TestRenderer.create(<Iframe {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` if `height` prop is not specified", () => {
    (HTMLIFrameElement as any).prototype.loading = true;
    mockedUseInView.mockReturnValue([() => {}, false, undefined]);

    const props = {
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      state: { frontity: { rendering: "csr" } },
    };

    const result = TestRenderer.create(<Iframe {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works with `IntersectionObserver` and is out of view", () => {
    mockedUseInView.mockReturnValue([() => {}, false, undefined]);

    const props = {
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      height: 300,
      state: { frontity: { rendering: "csr" } },
    };

    const result = TestRenderer.create(<Iframe {...props} />);
    expect(result.toJSON()).toMatchSnapshot();
  });

  test("works without `IntersectionObserver` and component did mount", () => {
    const props = {
      title: "Iframe title",
      src: "https://iframe-src.com/iframe",
      className: "fake-class-name",
      loading: "lazy" as "lazy",
      height: 300,
      state: { frontity: { rendering: "csr" } },
    };

    IntersectionObserver = undefined;

    const iframe = TestRenderer.create(<Iframe {...props} />).toJSON();
    expect(iframe).toMatchSnapshot();
  });
});
