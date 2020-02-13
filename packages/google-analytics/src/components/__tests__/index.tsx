/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { HelmetContext, State } from "frontity/types";
import { Root as GoogleAnalytics } from "..";
import GoogleAnalyticsPkg from "../../../types";

const getState = (): State<GoogleAnalyticsPkg> => ({
  analytics: { namespaces: ["googleAnalytics"] },
  googleAnalytics: {}
});

describe("GoogleAnalytics", () => {
  test("works with a single tracking id", () => {
    const state = getState();

    state.googleAnalytics.trackingId = "UA-XXXXXXX-X";

    const helmetContext: HelmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });

  test("works with multiple traking ids", () => {
    const state = getState();

    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];

    const helmetContext: HelmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = helmetContext.helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });
});
