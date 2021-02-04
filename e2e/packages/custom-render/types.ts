import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import Source from "@frontity/source/types";

/**
 * Package to do e2e testing of Frontity's rendering.
 */
interface Render extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Render namespace.
     */
    render: React.ElementType;
  };
}

/**
 * All packages used internally by the Render package.
 */
export type Packages = Render & Router & Source;

export default Render;
