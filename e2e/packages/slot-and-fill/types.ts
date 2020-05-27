import { Package } from "frontity/types";

interface SlotAndFill extends Package {
  name: "slot-and-fill";
  state: {};
  actions: {};
  roots: {
    slotAndFill: React.ReactType;
  };
  libraries: {};
}

export default SlotAndFill;
