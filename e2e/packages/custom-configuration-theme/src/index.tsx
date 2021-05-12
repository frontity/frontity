import * as React from "react";
// This module is aliased through custom-configuration package.
// eslint-disable-next-line import/no-unresolved
import Switch from "frontity-components/switch";

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
const CustomOne: React.FC<SwitchChildProps> = () => <h1 id="one">##One##</h1>;

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

      <Switch>
        <CustomOne when={number === 1} />
        <Default />
      </Switch>
    </>
  );
};

const SwitchPackage = {
  name: "e2e-custom-configuration-theme",
  roots: {
    switch: Component,
  },
};

export default SwitchPackage;
