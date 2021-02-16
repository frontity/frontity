import React from "react";
import Static from "../static";

const Dynamic2: React.FC = () => {
  return (
    <>
      <div data-test-id="dynamic2-div">I am the Dynamic2 component</div>
      <Static />
    </>
  );
};

export default Dynamic2;
