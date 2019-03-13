export type Settings<T = Package> = {
  name?: string; // Default: undefined
  match?: string | string[]; // Default: undefined
  mode?: string; // Default: "html"
  settings?: {
    url?: string; // Default: undefined
    title?: string; // Default: undefined
    timezone?: number; // Default: 0
    language?: string; // Default: "en"
  };
  packages: (string | T)[];
};

export type Package = {
  name: string;
  active?: boolean; // Default: true
  namespaces?: string | string[]; // Default: ["all"; "available"; "namespaces"];
  settings?: object;
};

export type AllSettings<T = Package> = Settings<T> | Settings<T>[];
