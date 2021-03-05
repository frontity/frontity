import { Package, MergePackages } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * Package to do e2e testing of Frontity's AMP package.
 */
interface TestAmp extends Package {
  /**
   * Package name.
   */
  name: "e2e-amp";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Theme namespace.
     */
    amp: React.ElementType;
  };
}

/**
 * All packages used internally by TestAmp.
 */
export type Packages = MergePackages<TestAmp, Router, Source>;

export default TestAmp;
