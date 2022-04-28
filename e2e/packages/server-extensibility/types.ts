import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's Lodable component.
 */
interface ServerExtensibility extends Package {
  /**
   * Package name.
   */
  name: "e2e-server-extensibility";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * ServerExtensibility namespace.
     */
    serverExtensibility: React.ElementType;
  };
}

export default ServerExtensibility;
