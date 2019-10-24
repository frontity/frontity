import React from "react";
import createCache from "@emotion/cache";
import { CacheProvider as EmotionProvider } from "@emotion/core";
import { Provider as ConnectProvider } from "@frontity/connect";
import { Package } from "@frontity/types";
import { HelmetProvider } from "react-helmet-async";
import { HelmetContext } from "../../types";

type Props = {
  store: Package;
  helmetContext?: HelmetContext;
};

const App: React.FunctionComponent<Props> = ({ store, helmetContext = {} }) => {
  const myCache = createCache();
  return (
    <HelmetProvider context={helmetContext}>
      <EmotionProvider value={myCache}>
        <ConnectProvider value={store}>
          {Object.entries(store.roots).map(([namespace, Root]) => (
            <Root key={namespace} />
          ))}
          {Object.entries(store.fills).map(([namespace, Fill]) => (
            <Fill key={namespace} />
          ))}
        </ConnectProvider>
      </EmotionProvider>
    </HelmetProvider>
  );
};

export default App;
