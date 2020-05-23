/**
 * The configuration object for a Fill.
 */
export interface Fill {
  /**
   * The name of the Slot that this Fill wants to be injected in.
   */
  slot: string;

  /**
   * The name of the React component that it should be stored in `libraries.fills`.
   */
  library: string;

  /**
   * The priority of this fill in relation to the other fills that also point to the same `slot`.
   *
   * @default 10
   */
  priority?: number;

  /**
   * Optional object with props that will be passed to the React component defined in `library`.
   */
  props?: {
    [key: string]: any;
  };
}

export interface Package {
  name?: string;
  roots?: {
    [namespace: string]: React.ReactType;
  };
  state?: {
    frontity?: {
      // Automatically populated:
      name?: string;
      mode?: string;
      initialLink?: string;
      packages?: string[];
      platform?: "client" | "server";
      rendering?: "ssr" | "csr";
      // Populated by the user:
      title?: string;
      description?: string;
      url?: string;
    };
    [namespace: string]: {
      [key: string]: any;
    };
  };
  actions?: {
    [namespace: string]: {
      [action: string]:
        | (({
            state,
            actions,
            libraries,
          }: {
            state: {
              [namespace: string]: {
                [state: string]: any;
              };
            };
            actions: {
              [key: string]: {
                [action: string]: any;
              };
            };
            libraries: {
              [key: string]: any;
            };
          }) => void)
        | (({
            state,
            actions,
            libraries,
          }: {
            state: {
              [namespace: string]: {
                [state: string]: any;
              };
            };
            actions: {
              [key: string]: {
                [action: string]: any;
              };
            };
            libraries: {
              [key: string]: any;
            };
          }) => (input: any) => void);
    };
  };
  libraries?: {
    [namespace: string]: {
      [library: string]: any;
    };
  };
}

export default Package;
