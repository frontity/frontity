import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Dynamic Public Path.
 */
interface DynamicPublicPath extends Package {
  /**
   * Package name.
   */
  name: "e2e-dynamic-public-path";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * DynamicPublicPath namespace.
     */
    dynamicPublicPath: React.ElementType;
  };
}

export default DynamicPublicPath;
