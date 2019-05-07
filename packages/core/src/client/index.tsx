import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { hydrate as hydrateEmotion } from "emotion";
import App from "../app";
import createStore from "./store";

export default async ({ packages }) => {
  // Hydrate Emotion.
  const ids = document.getElementById("__EMOTION_HYDRATATION_IDS__");
  if (ids) hydrateEmotion(JSON.parse(ids.innerHTML));
  else
    console.warn(
      "Emotion ids for hydratation not found. If you need help please visit https://community.frontity.org."
    );

  // Hydrate Connect state.
  const stateElement = document.getElementById("__FRONTITY_CONNECT_STATE__");
  if (stateElement) {
    const state = JSON.parse(stateElement.innerHTML);
    // Get a merged object with roots, fills, state, actions...
    const store = createStore({ state, packages });
    window["store"] = store;
    loadableReady(() => {
      hydrate(<App store={store} />, window.document.getElementById("root"));
    });
  } else
    console.warn(
      "State for Frontity Connect hydratation not found. If you need help please visit https://community.frontity.org."
    );
};
