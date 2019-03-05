import React, { useState } from "react";
import loadable from "@loadable/component";

const Dynamic = loadable(() => import("./dynamic"));

const App: React.FunctionComponent = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div>Hello World from React: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>click</button>
      <Dynamic />
    </>
  );
};

export default App;
