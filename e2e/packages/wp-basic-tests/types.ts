import { MergePackages, Package } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Package to do e2e testing of Frontity and WordPress instances together.
 */
interface WpBasicTests extends Package {
  /**
   * Package name.
   */
  name: "e2e-wp-basic-tests";

  /**
   * Roots exposed by this package.
   */
  roots: {
    /**
     * The WpBasicTests namespace.
     */
    wpBasicTests: React.ElementType;
  };
}

/**
 * All packages used internally by WpBasicTests.
 */
export type Packages = MergePackages<WpBasicTests, Source, Router>;

export default WpBasicTests;
