import { ResolveState, ResolveActions } from "./utils";

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
        | ((
            state?: ResolveState<Package["state"]>,
            actions?: ResolveActions<Package["actions"]>,
            libraries?: Package["libraries"]
          ) => void)
        | ((
            state?: ResolveState<Package["state"]>,
            actions?: ResolveActions<Package["actions"]>,
            libraries?: Package["libraries"]
          ) => (input: any) => void);
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
  //
  // Sagas are not supported yet.
  // sagas: {
  //   [namespace: string]: {
  //     [saga: string]: any;
  //   };
  // };
}

export default Package;
