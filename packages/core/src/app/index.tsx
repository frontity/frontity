import React from "react";
import { cache } from "emotion";
import { CacheProvider } from "@emotion/core";
import { MergedPackages } from "../types";

type Props = {
  store: MergedPackages;
};

const App: React.FunctionComponent<Props> = ({ store }) => {
  return (
    <CacheProvider value={cache}>
      {store.roots.map(({ Root, name }) => (
        <Root key={name} />
      ))}
      {store.fills.map(({ Fill, name }) => (
        <Fill key={name} />
      ))}
    </CacheProvider>
  );
};

export default App;
