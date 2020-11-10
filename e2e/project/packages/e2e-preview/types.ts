import { ServerAction, Package, MergePackages } from "frontity/types";
import Source from "@frontity/source/types";

/**
 * Package to do e2e testing of Frontity's Preview.
 */
interface Preview extends Package {
  /**
   * Package name.
   */
  name: "e2e-preview";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * The preview namespace.
     */
    preview: React.ElementType;
  };

  /**
   * Actions exposed by this package.
   */
  actions: {
    /**
     * The preview namespace.
     */
    preview: {
      /**
       * Before SSR action, to fetch the content from the REST API.
       */
      beforeSSR: ServerAction<Packages>;
    };
  };
}

/**
 * Merge type for all known packages.
 */
export type Packages = MergePackages<Source, Package>;

export default Preview;
