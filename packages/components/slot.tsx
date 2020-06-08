import React from "react";
import { connect, useFills } from "frontity";
import { Connect, Package } from "frontity/types";

type SlotType = React.FC<
  Connect<Package, { src?: string; code?: string; id?: string }>
>;

const Slot = ({ name, state, children, ...slotProps }) => {
  // Get the data, either from props or the current link.
  const data = slotProps.data || state.source.get(state.router.link);

  // Get the fills for this name.
  const fills = useFills(name);

  return fills.length > 0
    ? fills.map(({ Fill, props, key }) => (
        <Fill key={key} name={key} {...data} {...props} />
      ))
    : children;
};

export default connect(Slot);
