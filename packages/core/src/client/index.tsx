import React from "react";
import { hydrate } from "react-dom";
import App from "../app";

const render = (Component: React.FunctionComponent): void => {
  hydrate(<Component />, window.document.getElementById("root"));
};

declare global {
  interface NodeModule {
    hot: {
      accept(dependency: string, callback: () => void): void;
    };
  }
}

if (process.env.NODE_ENV === "development" && module["hot"]) {
  module["hot"].accept("../app", () => {
    const App = require("../app").default;
    render(App);
  });
}

render(App);
