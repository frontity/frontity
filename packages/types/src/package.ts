export interface Fill {
  slot: string;
  library: string;
  priority?: number;
  props?: {
    [key: string]: any;
  };
}

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
    fills: { [key: string]: Fill };
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
