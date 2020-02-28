import React from "react";
import Switch from "@frontity/components/switch";
import Package from "../types";

type SwitchChild = React.FC<{ when?: boolean }>;

const CustomOne: SwitchChild = () => <h1 id="one">One</h1>;

const CustomTwo: SwitchChild = () => <h1 id="two">Two</h1>;

const Default: SwitchChild = () => <h1 id="default">Default</h1>;

const Component: React.FC = () => {
  const [number, setNumber] = React.useState(0);

  return (
    <>
      <button id="set-to-0" onClick={() => setNumber(0)}>
        Show Default
      </button>
      <button id="set-to-1" onClick={() => setNumber(1)}>
        Show 1
      </button>
      <button id="set-to-2" onClick={() => setNumber(2)}>
        Show 2
      </button>

      <Switch>
        <CustomOne when={number === 1} />
        <CustomTwo when={number === 2} />
        <Default />
      </Switch>
    </>
  );
};

const SwitchPackage: Package = {
  name: "switch",
  state: {},
  actions: {},
  roots: {
    switch: Component
  },
  libraries: {}
};

export default SwitchPackage;
