export interface Package {
  name?: string;
  roots?: {
    [namespace: string]: React.ReactType;
  };
  fills?: {
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
      [key: string]: unknown;
    };
  };
  actions?: {
    [namespace: string]: {
      [action: string]:
        | (({
            state,
            actions,
            libraries
          }: {
            state: {
              [namespace: string]: {
                [state: string]: unknown;
              };
            };
            actions: {
              [key: string]: {
                [action: string]: unknown;
              };
            };
            libraries: {
              [key: string]: unknown;
            };
          }) => void)
        | (({
            state,
            actions,
            libraries
          }: {
            state: {
              [namespace: string]: {
                [state: string]: unknown;
              };
            };
            actions: {
              [key: string]: {
                [action: string]: unknown;
              };
            };
            libraries: {
              [key: string]: unknown;
            };
          }) => (input: unknown) => void);
    };
  };
  libraries?: {
    [namespace: string]: {
      [library: string]: unknown;
    };
  };
}

export default Package;
