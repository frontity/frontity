import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Iframe component.
 */
interface Image extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Image namespace.
     */
    image: React.ReactType;
  };
}

export default Image;
