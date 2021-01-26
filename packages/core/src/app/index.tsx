import * as React from "react";
import {
  InitializedStore,
  Provider as ConnectProvider,
} from "@frontity/connect";
import { Package } from "@frontity/types";
import { HelmetProvider, FilledContext } from "react-helmet-async";

/**
 * Props for the <App/> component.
 */
type AppProps = {
  /**
   * The object that contains the frontity actions, state, libraries, etc.
   * Normally created by calling `createStore()` from `@frontity/connect`.
   */
  store: InitializedStore<Package>;

  /**
   * The "context" of react-helmet-async. This is an implementation detail and
   * required to be passed as explained in https://github.com/staylor/react-helmet-async.
   */
  helmetContext?: FilledContext;
};

/**
 * The root component of a Frontity App.
 *
 * @param props - Defined in {@link Props}.
 *
 * @returns React Element.
 */
const App: React.FunctionComponent<AppProps> = ({
  store,
  helmetContext = {},
}) => {
  return (
    <HelmetProvider context={helmetContext}>
      <ConnectProvider value={store}>
        {Object.entries(store.roots).map(([namespace, Root]) => (
          <Root key={namespace} />
        ))}
      </ConnectProvider>
    </HelmetProvider>
  );
};

export default App;
