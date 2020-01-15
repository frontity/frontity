import { Analytics } from "./types";

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
export const sendPageview: SendPageview = ({ libraries }) => pageview => {
  Object.values(libraries.analytics).forEach(({ sendPageview }) =>
    sendPageview(pageview)
  );
};

/**
 * Get the functions for every analytics package
 * and run `sendEvent` for each one.
 */
export const sendEvent: SendEvent = ({ libraries }) => event => {
  Object.values(libraries.analytics).forEach(({ sendEvent }) =>
    sendEvent(event)
  );
};
