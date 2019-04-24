import React, { useState } from "react";
import { Namespace } from "@frontity/types/namespace";
import { cache } from "emotion";
import { CacheProvider } from "@emotion/core";
import { Overmind } from "overmind";
import { Provider } from "overmind-react";

type Props = {
  namespaces: { [key: string]: Namespace };
  stores: Overmind<{}>;
};

const App: React.FunctionComponent<Props> = ({ namespaces, stores }) => (
  <CacheProvider value={cache}>
    <Provider value={stores}>
      {Object.entries(namespaces).map(
        ([name, { Root }]) => Root && <Root key={name} />
      )}
      {Object.entries(namespaces).map(
        ([name, { Fills }]) => Fills && <Fills key={name} />
      )}
    </Provider>
  </CacheProvider>
);

export default App;
