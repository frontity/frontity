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
      initial?: {
        path: string;
        page: number;
        query?: Record<string, any>;
      };
      packages?: string[];
      platform?: "client" | "server";
      // Populated by the user:
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
            libraries
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
            libraries
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
  //
  // Filters are not supported yet.
  // filters: {
  //   [namespace: string]: {
  //     [filter: string]: any;
  //   };
  // };
}

export default Package;
