/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { HelmetContext } from "frontity/types";
import Iframe from "../iframe";

describe("Iframe", () => {
  test('It\'s a normal iframe if loading === "eager"', () => {
    const loading: "lazy" | "eager" = "eager";
    const props = {
      title: "Some fake title",
      src: "https://fake-src.com",
      className: "fake-class-name",
      loading
    };

    const iframe = TestRenderer.create(<Iframe {...props} />).toJSON();
    expect(iframe).toMatchSnapshot();
  });

  test("works on server (without height)", () => {
    const props = {
      title: "Some fake title",
      src: "https://frontity.com",
      className: "fake-class-name"
    };

    const helmetContext: HelmetContext = {};
    const iframe = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <Iframe {...props} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(iframe).toMatchSnapshot();
    expect(head.script.toString()).toMatchSnapshot();
    expect(head.noscript.toString()).toMatchSnapshot();
  });

  test("works on server (with height)", () => {
    const props = {
      title: "Some fake alt text",
      src: "https://fake-src.com",
      className: "fake-class-name",
      height: 300
    };

    const helmetContext: HelmetContext = {};
    const iframe = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <Iframe {...props} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(iframe).toMatchSnapshot();
    expect(head.script.toString()).toMatchSnapshot();
    expect(head.noscript.toString()).toMatchSnapshot();
  });
});
