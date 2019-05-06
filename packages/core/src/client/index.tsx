import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { hydrate as hydrateEmotion } from "emotion";
import App from "../app";
import createStores from "../stores/client";

export default async ({ packages }) => {
  // Hydrate Emotion.
  const ids = document.getElementById("__EMOTION_HYDRATATION_IDS__");
  if (ids) hydrateEmotion(JSON.parse(ids.innerHTML));
  else
    console.warn(
      "Emotion ids for hydratation not found. If you need help please visit https://community.frontity.org."
    );

  // Create the stores.
  const stores = createStores({ namespaces });
  // Wait until the store has been initialized. This waits for the onIntilize actions.
  await stores.initialized;

  loadableReady(() => {
    hydrate(
      <App namespaces={namespaces} stores={stores} />,
      window.document.getElementById("root")
    );
  });
};
