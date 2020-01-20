import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Analytics from "./types";

type SendPageview = Analytics["actions"]["analytics"]["sendPageview"];
type SendEvent = Analytics["actions"]["analytics"]["sendEvent"];

/**
 * Send a pageview anytime the title changes
 * and data.isReady === true.
 */
export const Root = connect<React.FC<Connect<Analytics>>>(
  ({ state, actions }) => {
    return (
      <Head
        onChangeClientState={newState => {
          if (state.source.get(state.router.link).isReady) {
            actions.analytics.sendPageview({
              page: state.router.link,
              title: newState.title
            });
          }
        }}
      />
    );
  }
);

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
