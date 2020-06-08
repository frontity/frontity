import { Package, Action } from "frontity/types";

interface SlotAndFill extends Package {
  name: "slot-and-fill";
  actions: {
    slotAndFill: {
      addFill1: Action<SlotAndFill>;
      addFill2: Action<SlotAndFill>;
      toggleDebug: Action<SlotAndFill>;
    };
  };
  roots: {
    slotAndFill: React.ReactType;
  };
  libraries: {
    fills: {
      slotAndFill: {
        Fill1: React.ReactType<{ text: string }>;
        Fill2: React.ReactType<{ text: string }>;
      };
    };
  };
}

export default SlotAndFill;
