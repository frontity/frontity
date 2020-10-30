import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's font support.
 */
interface Fonts extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Fonts namespace.
     */
    fonts: React.ElementType;
  };
}

export default Fonts;
