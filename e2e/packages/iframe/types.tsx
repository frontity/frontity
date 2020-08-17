import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Iframe component.
 */
interface Iframe extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Iframe namespace.
     */
    iframe: React.ReactType;
  };
}

export default Iframe;
