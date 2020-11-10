import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Iframe component.
 */
interface Iframe extends Package {
  /**
   * Package name.
   */
  name: "e2e-iframe";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Iframe namespace.
     */
    iframe: React.ElementType;
  };
}

export default Iframe;
