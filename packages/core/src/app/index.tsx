import React, { useState } from "react";
import loadable from "@loadable/component";
import { Namespace } from "@frontity/types/namespace";
import Hemlet from "react-helmet";

const Dynamic = loadable(() => import("./dynamic"));

type Props = {
  namespaces: { [key: string]: Namespace };
};

const App: React.FunctionComponent<Props> = ({ namespaces }) => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <Hemlet>
        <title>Frontity</title>
      </Hemlet>
      <div>Hello World from React: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>click</button>
      <Dynamic />
      {Object.entries(namespaces).map(
        ([name, { Root }]) => Root && <Root key={name} />
      )}
      {Object.entries(namespaces).map(
        ([name, { Fills }]) => Fills && <Fills key={name} />
      )}
    </>
  );
};

export default App;
