import { ServerAction, Package } from "frontity/types";
import Source from "@frontity/source/types";

/**
 * Package to do e2e testing of Frontity's Preview.
 */
interface Preview extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * The preview namespace.
     */
    preview: React.ReactType;
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
export type Packages = Source & Package;

export default Preview;
