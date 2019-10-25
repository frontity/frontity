import React from "react";
import { Global, css, connect, URL } from "frontity";
import Package from "../types";

const BackgroundBlue = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            body {
              background-color: blue;
            }
          `}
        />
      )}
      <div data-test-id="div-with-text">BackgroundBlue</div>
      <button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </button>
    </>
  );
};

const ColorRed = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            body {
              color: red;
            }
          `}
        />
      )}
      <div data-test-id="div-with-text">ColorRed</div>
      <button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </button>
    </>
  );
};

const Root = connect(({ state }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3000");
  if (pathname === "/background-blue") return <BackgroundBlue />;
  if (pathname === "/color-red") return <ColorRed />;
});

const GlobalPackage: Package = {
  name: "global",
  state: {},
  actions: {},
  roots: {
    global: Root
  },
  libraries: {}
};

export default GlobalPackage;
