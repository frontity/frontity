/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as GoogleTagManager } from "..";
import GoogleTagManagerPkg from "../../../types";

const getState = (): State<GoogleTagManagerPkg> => ({
  analytics: {
    pageviews: { googleTagManager: true },
    events: {},
  },
  googleTagManager: {},
});

describe("GoogleTagManager", () => {
  test("works with a single container id", () => {
    const state = getState();

    state.googleTagManager.containerId = "GTM-XXXXXXX";

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

    state.googleTagManager.containerIds = ["GTM-XXXXXXX", "GTM-YYYYYYY"];

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
