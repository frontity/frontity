/**
 * @jest-environment node
 */

import TestRenderer from "react-test-renderer";
import { HelmetProvider } from "frontity";
import { State } from "frontity/types";
import { FilledContext } from "react-helmet-async";
import { Root as ComscoreAnalytics } from "..";
import { Packages } from "../../../types";

const getState = (): State<Packages> => ({
  frontity: {},
  analytics: {
    pageviews: { comscoreAnalytics: true },
    events: {},
  },
  comscoreAnalytics: {},
});

describe("Comscore Analytics Component", () => {
  test("should render script for all tracking IDs", () => {
    const state = getState();

    state.comscoreAnalytics.trackingIds = ["111111", "222222"];

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(head.noscript.toComponent()).toMatchSnapshot();
  });

  test("should render a script for a single tracking ID", () => {
    const state = getState();

    state.comscoreAnalytics.trackingId = "333333";

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(head.noscript.toComponent()).toMatchSnapshot();
  });

  test("should not render if no tracking IDs are specified", () => {
    const state = getState();

    const helmetContext = {};
    TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(head.noscript.toComponent()).toMatchSnapshot();
  });
});

describe("Comscore Analytics Component (AMP)", () => {
  test("should render script for all tracking IDs", () => {
    const state = getState();
    state.frontity.mode = "amp";
    state.comscoreAnalytics.trackingIds = ["111111", "222222"];

    const helmetContext = {};
    const app = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(app).toMatchSnapshot();
  });

  test("should render a script for a single tracking ID", () => {
    const state = getState();
    state.frontity.mode = "amp";
    state.comscoreAnalytics.trackingId = "333333";

    const helmetContext = {};
    const app = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(app).toMatchSnapshot();
  });

  test("should not render if no tracking IDs are specified", () => {
    const state = getState();
    state.frontity.mode = "amp";

    const helmetContext = {};
    const app = TestRenderer.create(
      <HelmetProvider context={helmetContext}>
        <ComscoreAnalytics state={state} actions={null} libraries={null} />
      </HelmetProvider>
    ).toJSON();
    const head = (helmetContext as FilledContext).helmet;

    expect(head.script.toComponent()).toMatchSnapshot();
    expect(app).toMatchSnapshot();
  });
});
