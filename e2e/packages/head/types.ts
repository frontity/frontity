import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Head component.
 */
interface Head extends Package {
  /**
   * Package name.
   */
  name: "e2e-head";
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Head namespace.
     */
    head: React.ElementType;
  };
}

export default Head;
