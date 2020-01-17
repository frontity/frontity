import { observe } from "frontity";
import TitleObserver from "./utils/title-observer";
import Analytics from "./types";

type AfterCSR = Analytics["actions"]["analytics"]["afterCSR"];
type SendPageview = Analytics["actions"]["analytics"]["sendPageview"];
type SendEvent = Analytics["actions"]["analytics"]["sendEvent"];

// Send a pageview anytime the link changes.
export const afterCSR: AfterCSR = ({ state, actions }) => {
  console.log("afterCSR");

  let isFirstRender = true;

  // Initializes the title observer.
  const titleObserver = new TitleObserver();

  observe(async () => {
    console.log("observe");
    const { link } = state.router;
    const data = state.source.get(link);

    if (data.isReady) {
      const title = isFirstRender
        ? document.title
        : await titleObserver.waitForChanges();

      isFirstRender = false; // eslint-disable-line require-atomic-updates
      actions.analytics.sendPageview({ page: link, title });
    }
  });
};

/**
 * Get the functions for every analytics package
 * and run `sendPageview` for each one.
 */
export const sendPageview: SendPageview = ({ state, actions }) => pageview => {
  Object.keys(state.analytics.namespaces)
    .map(ns => actions[ns])
    .forEach(({ sendPageview }) => sendPageview(pageview));
};

/**
 * Get the functions for every analytics package
 * and run `sendEvent` for each one.
 */
export const sendEvent: SendEvent = ({ state, actions }) => event => {
  Object.keys(state.analytics.namespaces)
    .map(ns => actions[ns])
    .forEach(({ sendEvent }) => sendEvent(event));
};
