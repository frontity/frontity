import React, { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div>Hello World from React: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>click</button>
    </>
  );
};

export default App;
