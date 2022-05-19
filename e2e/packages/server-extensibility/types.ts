import { Server, AsyncServer, Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's server extensibility.
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

  /**
   * Server middleware.
   */
  server?: {
    /**
     * ServerExtensibility namespace.
     */
    serverExtensibility: {
      /**
       * Server middleware.
       */
      robotsTxtOne: Server<ServerExtensibility>;

      /**
       * Server middleware.
       */
      robotsTxtTwo: Server<ServerExtensibility>;

      /**
       * Server middleware.
       */
      addFrontityHeaderOne: Server<ServerExtensibility>;

      /**
       * Server middleware.
       */
      addFrontityHeaderTwo: Server<ServerExtensibility>;

      /**
       * Server middleware.
       */
      addFrontityHeaderThree: AsyncServer<ServerExtensibility>;

      /**
       * Server middleware.
       */
      accessFrontityState: Server<ServerExtensibility>;
    };
  };
}

export default ServerExtensibility;
