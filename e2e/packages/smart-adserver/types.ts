import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import SmartAdserver from "@frontity/smart-adserver/types";

/**
 * Package to do the e2e testing of Smart ads.
 */
interface TestSmartAdserver extends Package {
  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Mocked getter for the data object given a specific link.
       *
       * Required because `<Slot>` depends on it.
       */
      get: Function;
    };
  };

  /**
   * The root components exposed by this package.
   */
  roots: {
    /**
     * The root component.
     */
    theme: React.ElementType;
  };
}

/**
 * All packages used internally by the TestSmartAdserver package.
 */
export type Packages = TestSmartAdserver & Router & SmartAdserver;

export default TestSmartAdserver;
