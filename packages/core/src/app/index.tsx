import React from "react";
import { cache } from "emotion";
import { CacheProvider as EmotionProvider } from "@emotion/core";
import { Provider as ConnectProvider } from "@frontity/connect";
import { MergedPackages } from "../types";

type Props = {
  store: MergedPackages;
};

const App: React.FunctionComponent<Props> = ({ store }) => {
  return (
    <EmotionProvider value={cache}>
      <ConnectProvider value={store}>
        {store.roots.map(({ Root, name }) => (
          <Root key={name} />
        ))}
        {store.fills.map(({ Fill, name }) => (
          <Fill key={name} />
        ))}
      </ConnectProvider>
    </EmotionProvider>
  );
};

export default App;
