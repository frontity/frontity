import React from "react";
import connect from "@frontity/connect";
import { Connect, Package } from "../../../types";
import useFills from "./use-fills";

interface SlotProps {
  /*
   * The name of the Slot.
   * The user of this Slot will have to specify this name in order to insert a Fill component.
   */
  name: string;

  /*
   * Any data that you might want to pass to the Fill.
   * Normally used for passing route data fetched in the parent component.
   */
  data?: any;

  /*
   * Any other prop.
   * The theme can specify other props and they will be passed down to the Fill.
   */
  [key: string]: any;
}

type SlotType = React.FC<Connect<Package, SlotProps>>;

/**
 * A React component that renders a Fill to fulfill a Slot and Fill pattern.
 */
const Slot: SlotType = ({ name, state, children, ...slotProps }) => {
  // Get the data, either from props or the current link.
  const data = slotProps.data || state.source.get(state.router.link);

  // Get the fills for this name.
  const fills = useFills(name);

  return (
    // Returning a <Fragment/> because returning an array of components results in a typescript error
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
    <>
      {fills.length > 0
        ? fills.map(({ Fill, props, key }) => (
            <Fill key={key} name={key} data={data} {...slotProps} {...props} />
          ))
        : children}
    </>
  );
};

export default connect(Slot);
