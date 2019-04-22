import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { hydrate as hydrateEmotion } from "emotion";
import App from "../app";

const render = (Component: React.ReactType): void => {
  hydrate(<Component />, window.document.getElementById("root"));
};

export default ({ namespaces }) => {
  loadableReady(() => {
    const ids = document.getElementById("__EMOTION_HYDRATATION_IDS__");
    if (ids) hydrateEmotion(JSON.parse(ids.innerHTML));
    const Component = () => <App namespaces={namespaces} />;
    render(Component);
  });
};
