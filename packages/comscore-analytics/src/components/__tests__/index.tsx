/**
 * @jest-environment node
 */

import React from "react";
import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as ComscoreAnalytics } from "..";
import ComscoreAnalyticsPkg from "../../../types";

const getState = (): State<ComscoreAnalyticsPkg> => ({
  analytics: { pageviews: { comscoreAnalytics: true } },
  comscoreAnalytics: {
    trackingIds: [],
  },
});

describe("Comscore Analytics", () => {
  test("should send if tracking ids are passed", () => {
    const state = getState();

    state.comscoreAnalytics.trackingIds = ["UA-XXXXXXX-X", "UA-YYYYYYY-Y"];

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });

  test("should not send if no tracking ids are passed", () => {
    const state = getState();

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toString()).toMatchSnapshot();
  });
});
