import { MonoSettings, MultiSettings } from "./settings";

export interface Package {
  name?: string;
  namespaces?: string[];
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

export type Settings<Pkg = Package> = [Pkg] extends [never]
  ? never
  : MonoSettings<Pkg> | MultiSettings<Pkg>[];

export type Action<Pkg extends Package, Input = null> = [Input] extends [null]
  ? (state: Pkg["state"]) => void
  : (state: Pkg["state"]) => (input: Input) => void;

export type Derived<Pkg extends Package, InputOrOutput, Output = null> = [
  Output
] extends [null]
  ? (state: Pkg["state"]) => InputOrOutput
  : (state: Pkg["state"]) => (input: InputOrOutput) => Output;
