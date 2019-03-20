export type Package = {
  name: string; // Default: undefined
  active?: boolean; // Default: true
  namespaces?: string | string[]; // Default: undefined;
  settings?: object; // Default: undefined
};

export type Packages = {
  [key: string]: string[];
};

export type UniqueSettings<T = Package> = {
  name?: string; // Default: undefined
  matches?: string[]; // Default: undefined
  mode?: string; // Default: "html"
  settings?: {
    url?: string; // Default: undefined
    title?: string; // Default: undefined
    timezone?: number; // Default: 0
    language?: string; // Default: "en"
  };
  packages: (string | T)[];
};

export type MultiSettings<T = Package> = UniqueSettings<T> & {
  name: string; // Default: undefined
};

export type Settings<T = Package> = UniqueSettings<T> | MultiSettings<T>[];
