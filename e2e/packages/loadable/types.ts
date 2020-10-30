import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Lodable component.
 */
interface Loadable extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Loadable namespace.
     */
    loadable: React.ElementType;
  };
}

export default Loadable;
