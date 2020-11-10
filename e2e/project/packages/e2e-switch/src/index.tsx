import React from "react";
import Switch from "@frontity/components/switch";
import Package from "../types";

/**
 * The props of the {@link SwitchChild} component.
 */
interface SwitchChildProps {
  /**
   * An optional when prop, which is the condition that needs to be met to show
   * this component.
   */
  when?: boolean;
}

/**
 * A React component that acts like the children of a Switch.
 *
 * @returns React element.
 */
const CustomOne: React.FC<SwitchChildProps> = () => <h1 id="one">One</h1>;

/**
 * A React component that acts like the children of a Switch.
 *
 * @returns React element.
 */
const CustomTwo: React.FC<SwitchChildProps> = () => <h1 id="two">Two</h1>;

/**
 * A React component that acts like the children of a Switch.
 *
 * @returns React element.
 */
const Default: React.FC<SwitchChildProps> = () => <h1 id="default">Default</h1>;

/**
 * A React component that contains all the Switch children and buttons to toggle
 * between them.
 *
 * @returns React element.
 */
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
  name: "e2e-switch",
  roots: {
    switch: Component,
  },
};

export default SwitchPackage;
