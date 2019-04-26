import Package from "@frontity/types/package";
import { MonoSettings } from "@frontity/types/settings";

export type NormalizedPackage = Package & {
  active: boolean;
  namespaces: string[];
  settings: {
    [namespace: string]: object;
  };
};

export interface NormalizedSettings<T = NormalizedPackage>
  extends MonoSettings<T> {
  mode: string;
  settings: {
    timezone: number;
    language: string;
  };
  packages: T[];
}

export type Site = {
  name: string;
  mode: string;
  packages: {
    name: string;
    namespaces: string[];
  }[];
};
