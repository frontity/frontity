import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { getSnapshot } from "@frontity/connect";
import App from "../app";
import createStore from "./store";
import { FC } from "react";

export default async ({ packages }) => {
  if (typeof window !== "undefined" && window["Proxy"]) {
    // Hydrate Connect state.
    const stateElement = document.getElementById("__FRONTITY_CONNECT_STATE__");
    if (!stateElement) {
      console.warn(
        "State for Frontity Connect hydratation not found. If you need help please visit https://community.frontity.org."
      );
    } else {
      // Get a merged object with roots, fills, state, actions...
      const store = createStore({
        // Use initial state from server only if we are not in a HMR reload.
        state: window["frontity"]
          ? getSnapshot(window["frontity"].state)
          : JSON.parse(stateElement.innerHTML),
        packages,
      });

      // Run init actions.
      await Promise.all(
        Object.values(store.actions).map(({ init }) => {
          if (init) return init();
        })
      );

      // Run beforeCSR actions only if we are not in a HMR reload.
      if (!window["frontity"]) {
        await Promise.all(
          Object.values(store.actions).map(({ beforeCSR }) => {
            if (beforeCSR) return beforeCSR({ libraries: store.libraries });
          })
        );
      }

      loadableReady(() => {
        /**
         * The FrontityApp functional component.
         *
         * @returns A functional component.
         */
        let FrontityApp: FC = () => <App store={store} />;

        // If there's a user supplied `App` component
        // we should use that to render the the main App.
        if (store.libraries.frontity.App) {
          // Get a reference to the user defined `App`.
          const UserDefinedApp = store.libraries.frontity.App;

          // Keep a reference of the initially defined `App`.
          const InitialApp = FrontityApp;

          /**
           * The wrapped FrontityApp component.
           *
           * @returns The functional component to be rendered.
           */
          FrontityApp = function WrappedFrontityApp() {
            return <UserDefinedApp App={InitialApp} />;
          };
        }

        hydrate(<FrontityApp />, window.document.getElementById("root"));

        // Switch to CSR mode.
        store.state.frontity.rendering = "csr";

        // Run afterCSR actions only if we are not in a HMR reload.
        if (!window["frontity"]) {
          Object.values(store.actions).forEach(({ afterCSR }) => {
            if (afterCSR) afterCSR();
          });
        }

        // Assign the store to a global for easy access in console and HMR.
        window["frontity"] = store;
      });
    }
  } else {
    console.warn(
      "Frontity scripts not loaded because Proxy is not supported in this browser. If you need help please visit https://community.frontity.org."
    );
  }
};
