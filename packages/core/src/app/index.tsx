import React, { useState } from "react";
import { cache } from "emotion";
import { CacheProvider } from "@emotion/core";
import { MergedPackages } from "../types";

type Props = {
  merged: MergedPackages;
};

const App: React.FunctionComponent<Props> = ({ merged }) => (
  <CacheProvider value={cache}>
    {merged.roots.map(({ Root, name }) => (
      <Root key={name} />
    ))}
    {merged.fills.map(({ Fill, name }) => (
      <Fill key={name} />
    ))}
  </CacheProvider>
);

export default App;
