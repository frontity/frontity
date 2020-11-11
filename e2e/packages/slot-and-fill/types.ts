import { Package, Action } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Slot and Fill pattern.
 */
interface SlotAndFill extends Package {
  /**
   * Package name.
   */
  name: "e2e-slot-and-fill";
  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * SlotAndFill namespace.
     */
    slotAndFill: {
      /**
       * Action to add a fill.
       */
      addFill1: Action<SlotAndFill>;

      /**
       * Action to add a second fill.
       */
      addFill2: Action<SlotAndFill>;

      /**
       * Action to toggle the `state.frontity.debug` mode.
       */
      toggleDebug: Action<SlotAndFill>;
    };
  };

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * SlotAndFill namespace.
     */
    slotAndFill: React.ElementType;
  };

  /**
   * Loadable namespace.
   */
  libraries: {
    /**
     * Fills namespace.
     */
    fills: {
      /**
       * SlotAndFill namespace.
       */
      slotAndFill: {
        /**
         * A Fill component.
         */
        Fill1: React.ElementType;

        /**
         * Another Fill component.
         */
        Fill2: React.ElementType;
      };
    };
  };
}

export default SlotAndFill;
