import Analytics from "./types";

type AfterCSR = Analytics["actions"]["analytics"]["afterCSR"];
type SendPageview = Analytics["actions"]["analytics"]["sendPageview"];
type SendEvent = Analytics["actions"]["analytics"]["sendEvent"];

export const afterCSR: AfterCSR = ({ actions }) => {
  // TODO: change this, it's just an example.
  actions.analytics.sendPageview({ url: "", title: "" });
};

/**
 * Get the functions for every analytics package
 * and run `sendPageview` for each one.
 */
export const sendPageview: SendPageview = ({ state, actions }) => pageview => {
  state.analytics.namespaces
    .map(ns => actions[ns])
    .forEach(({ sendPageview }) => sendPageview(pageview));
};

/**
 * Get the functions for every analytics package
 * and run `sendEvent` for each one.
 */
export const sendEvent: SendEvent = ({ state, actions }) => event => {
  state.analytics.namespaces
    .map(ns => actions[ns])
    .forEach(({ sendEvent }) => sendEvent(event));
};
