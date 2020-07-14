/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as GoogleAnalytics } from "..";
import GoogleAnalyticsPkg from "../../../types";

const getState = (): State<GoogleAnalyticsPkg> => ({
  analytics: {
    pageviews: { googleAnalytics: true },
    events: {},
  },
  googleAnalytics: {},
});

describe("GoogleAnalytics", () => {
  test("works with a single tracking id", () => {
    const state = getState();

    state.googleAnalytics.trackingId = "UA-XXXXXXX-X";

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });

  test("works with multiple traking ids", () => {
    const state = getState();

    state.googleAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });

  test("doesn't add anything if there's no tracking ids", () => {
    const state = getState();

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });
});
