import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Script component.
 */
interface Script extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Script namespace.
     */
    script: React.ReactType;
  };
}

export default Script;
