import { Package, Action, MergePackages } from "frontity/types";
import Html2React from "@frontity/html2react/types";

/**
 * Package to do e2e testing of Frontity's Html2React package.
 */
interface Html2ReactTests extends Package {
  /**
   * Package name.
   */
  name: "e2e-html2react";

  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Html2reactTests namespace.
     */
    html2reactTests: {
      /**
       * The color that we will use to see if Html2React is reactive to state
       * changes.
       *
       * @defaultValue "blue"
       */
      color: string;
    };
  };

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * Html2reactTests namespace.
     */
    html2reactTests: {
      /**
       * An action to mutate `state.html2reactTests.color`.
       */
      setColor: Action<Html2ReactTests, string>;
    };
  };

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Html2reactTests namespace.
     */
    html2reactTests: React.ElementType;
  };

  /**
   * Libraries exposed by this package.
   */
  libraries: {
    /**
     * Html2reactTests namespace.
     */
    html2react: {
      /**
       * The processors of Html2React.
       */
      processors: Html2React["libraries"]["html2react"]["processors"];
    };
  };
}

/**
 * All packages used internally by Html2ReactTests.
 */
export type Packages = MergePackages<Html2ReactTests, Html2React>;

export default Html2ReactTests;
