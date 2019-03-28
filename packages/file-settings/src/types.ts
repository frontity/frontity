type Base = {
  matches?: string[]; // Default: undefined
  mode?: string; // Default: "html"
  settings?: {
    url?: string; // Default: undefined
    title?: string; // Default: undefined
    timezone?: number; // Default: 0
    language?: string; // Default: "en"
  };
};

export type Package = {
  name: string; // Default: undefined
  active?: boolean; // Default: true
  namespaces?: string[]; // Default: undefined
  settings?: object; // Default: undefined
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
  mode: string;
  settings: {
    timezone: number;
    language: string;
  };
  packages: T[];
};

export type MonoSettings<T = Package> = Imported<T> & Mono;

export type MultiSettings<T = Package> = Imported<T> & Multi;

export type NormalizedMono<T = Package> = Normalized<T> & Mono;

export type NormalizedMulti<T = Package> = Normalized<T> & Multi;

export type Settings<T = Package> = MonoSettings<T> | MultiSettings<T>[];

export type NormalizedSettings<T = Package> =
  | NormalizedMono<T>
  | NormalizedMulti<T>[];
