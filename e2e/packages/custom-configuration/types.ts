import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's rendering.
 */
interface CustomConfiguration extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Render namespace.
     */
    configuration: React.ElementType;
  };
}

/**
 * All packages used internally by the Render package.
 */
export type Packages = CustomConfiguration;

export default CustomConfiguration;
