import Namespaces from "./namespaces";

export interface Package {
  name?: string;
  namespaces?: Namespaces;
  roots?: {
    [namespace: string]: React.ReactType;
  };
  fills?: {
    [namespace: string]: React.ReactType;
  };
  state?: {
    settings?: {
      [namespace: string]: {
        [key: string]: any;
      };
    };
    [namespace: string]: {
      [key: string]: any;
    };
  };
  actions?: {
    [namespace: string]: {
      [action: string]:
        | ((state: Package["state"]) => void)
        | ((state: Package["state"]) => (input: any) => void);
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
