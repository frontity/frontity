/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as GoogleTagManager } from "..";
import GoogleTagManagerPkg from "../../../types";

const getState = (): State<GoogleTagManagerPkg> => ({
  analytics: {
    pageviews: { googleTagManagerAnalytics: true },
    events: {},
  },
  googleTagManagerAnalytics: {},
});

describe("GoogleTagManager", () => {
  test("works with a single container id", () => {
    const state = getState();

    state.googleTagManagerAnalytics.containerId = "GTM-XXXXXXX";

    const helmetContext = {};
    const rendered = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleTagManager state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
    expect(rendered).toMatchSnapshot();
  });

  test("works with multiple container ids", () => {
    const state = getState();

    state.googleTagManagerAnalytics.containerIds = [
      "GTM-XXXXXXX",
      "GTM-YYYYYYY",
    ];

    const helmetContext = {};
    const rendered = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleTagManager state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
    expect(rendered).toMatchSnapshot();
  });

  test("doesn't add anything if there's no container ids", () => {
    const state = getState();

    const helmetContext = {};
    const rendered = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <GoogleTagManager state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
    expect(rendered).toMatchSnapshot();
  });
});
