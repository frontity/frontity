type Base = {
  match?: string[];
  mode?: string;
  state?: {};
};

export type Package = {
  name: string;
  active?: boolean;
  state?: object;
};

export type NormalizedPackage = Package & {
  active: boolean; // Default: true
  state: object; // Default: {}
};

type Mono = Base & {
  name?: string;
};

type Multi = Base & {
  name: string;
};

type Imported<T> = Base & {
  packages: (string | T)[];
};

type Normalized<T> = Base & {
  mode: string; // Default: html
  state: object; // Default: {}
  packages: T[];
};

export type MonoSettings<T = Package> = Imported<T> & Mono;

export type MultiSettings<T = Package> = Imported<T> & Multi;

export type Settings<T = Package> = MonoSettings<T> | MultiSettings<T>[];

export type NormalizedSettings<T = NormalizedPackage> = Normalized<T> & Multi;

export type Site = {
  name: string;
  mode: string;
  packages: string[];
};
