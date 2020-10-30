import { Package, Action } from "frontity/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Package to do e2e testing of Frontity's Lodable component.
 */
interface WpSourceErrors extends Package {
  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * WpSourceErrors namespace.
     */
    wpSourceErrors: {
      /**
       * The initialization action. It changes `state.source.api`.
       */
      init: Action<Packages>;
    };
  };

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * WpSourceErrors namespace.
     */
    wpSourceErrors: React.ElementType;
  };
}

/**
 * All packages used internally by WpSourceErrors.
 */
export type Packages = WpSourceErrors & WpSource;

export default WpSourceErrors;
