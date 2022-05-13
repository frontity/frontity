import Fill from "./fill";

/**
 * Types of a Frontity package.
 *
 * The main purpose of this interface is to be extended by the specific types of
 * a Frontity package.
 */
export interface Package {
  /**
   * The name of the Frontity package.
   */
  name?: string;

  /**
   * An object of React components exposed by this package. The keys are the
   * namespaces.
   */
  roots?: {
    [namespace: string]: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state?: {
    /**
     * The configuration objects for all the fills exposed by this package.
     */
    fills?: {
      [namespace: string]: {
        [name: string]: Fill;
      };
    };

    /**
     * The rest of the state exposed by this package.
     *
     * TODO: Replace `any` with serializable objects and derived state.
     */
    [namespace: string]: {
      [key: string]: any;
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions?: {
    [namespace: string]: Actions;
  };

  /**
   * The libraries exposed by this package.
   */
  libraries?: {
    /**
     * The Fill components exposed by this package.
     */
    fills?: {
      [namespace: string]: {
        [name: string]: React.ElementType;
      };
    };

    /**
     * The rest of the libraries exposed by this package.
     */
    [namespace: string]: {
      [library: string]: any;
    };
  };

  /**
   * The server middleware exposed by this package.
   */
  server?: {
    [namespace: string]: Servers;
  };
}

export default Package;

/**
 * Generic function for actions and server.
 */
type Funct = (...args: unknown[]) => unknown;

/**
 * Generic async function for actions and server.
 */
type AsyncFunct = (...args: unknown[]) => Promise<unknown>;

/**
 * An object containing Frontity actions, or other objects containing actions.
 */
interface Actions {
  [key: string]: Funct | AsyncFunct | Actions;
}

/**
 * An object containing server middleware functions.
 */
interface Servers {
  [key: string]: Funct | AsyncFunct | Servers;
}
