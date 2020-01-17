import { observe } from "frontity";
import Analytics from "./types";

type AfterCSR = Analytics["actions"]["analytics"]["afterCSR"];
type SendPageview = Analytics["actions"]["analytics"]["sendPageview"];
type SendEvent = Analytics["actions"]["analytics"]["sendEvent"];

// Send a pageview anytime the link changes.
export const afterCSR: AfterCSR = ({ state, actions }) => {
  console.log("afterCSR");

  observe(async () => {
    const { link } = state.router;

    // Wait data to be ready.
    if (state.source.get(link).isReady) {
      /**
       * Execute action in the next tick so we can
       * ensure the title has changed by React.
       */
      setTimeout(() => {
        actions.analytics.sendPageview({
          page: link,
          title: document.title
        });
      });
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
