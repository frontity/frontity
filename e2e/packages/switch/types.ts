import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Switch component.
 */
interface Switch extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Switch namespace.
     */
    switch: React.ElementType;
  };
}

export default Switch;
