import { Package, MergePackages } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";
import Html2React from "@frontity/html2react/types";

/**
 * Package to do e2e testing of Frontity's analytics library.
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

  /**
   * Libraries exposed by this package.
   */
  libraries: {
    /**
     * Html2reactTests namespace.
     */
    html2react: {
      /**
       * The processors of Html2React.
       */
      processors: Html2React["libraries"]["html2react"]["processors"];
    };
  };
}

/**
 * All packages used internally by TestAnalytics.
 */
export type Packages = MergePackages<TestAmp, Router, Source>;

export default TestAmp;
