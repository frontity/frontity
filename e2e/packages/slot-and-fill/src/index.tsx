import React from "react";
import { useFills } from "frontity";
import SlotAndFill from "../types";

const Root: React.FC = () => {
  const fills1 = useFills("slot 1");
  const fills2 = useFills("slot 2");
  return (
    <>
      {fills1.map(({ Fill, key, props }) => (
        <Fill key={key} {...props} />
      ))}
      <hr />
      {fills2.map(({ Fill, key, props }) => (
        <Fill key={key} {...props} />
      ))}
    </>
  );
};

const slotAndFill: SlotAndFill = {
  name: "slot-and-fill",
  state: {},
  actions: {},
  roots: {
    slotAndFill: Root,
  },
  libraries: {},
};

export default slotAndFill;
