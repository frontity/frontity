import { MergePackages, Package } from "frontity/types";
import Router from "@frontity/router/types";

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
export type Packages = MergePackages<Render, Router>;

export default Render;
