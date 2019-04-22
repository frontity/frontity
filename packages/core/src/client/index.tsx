import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import App from "../app";

const render = (Component: React.ReactType): void => {
  hydrate(<Component />, window.document.getElementById("root"));
};

export default ({ namespaces }) => {
  loadableReady(() => {
    const Component = () => <App namespaces={namespaces} />;
    render(Component);
  });
};
