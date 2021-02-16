import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Iframe component.
 */
interface Image extends Package {
  /**
   * Package name.
   */
  name: "e2e-image";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Image namespace.
     */
    image: React.ElementType;
  };
}

export default Image;
