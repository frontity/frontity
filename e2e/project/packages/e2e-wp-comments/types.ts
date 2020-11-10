import { MergePackages, Package } from "frontity/types";
import WpComments from "@frontity/wp-comments/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Package to do e2e tests to the wp-comments package.
 */
interface TestWpComments extends Package {
  /**
   * Package name.
   */
  name: "e2e-wp-comments";

  /**
   * Roots exposed by this package.
   */
  roots: {
    /**
     * WpComments namespace.
     */
    wpComments: React.ElementType;
  };
}

export default TestWpComments;

/**
 * Packages required by this one.
 */
export type Packages = MergePackages<WpSource, WpComments, TestWpComments>;
