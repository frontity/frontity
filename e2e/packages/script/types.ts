import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Script component.
 */
interface Script extends Package {
  /**
   * Package name.
   */
  name: "e2e-script";
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Script namespace.
     */
    script: React.ElementType;
  };
}

export default Script;
