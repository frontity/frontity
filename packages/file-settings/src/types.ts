export type Settings<T = Package> = {
  name?: string; // Default: undefined
  matches?: string[]; // Default: undefined
  mode?: string; // Default: "html"
  settings?: {
    url?: string; // Default: undefined
    title?: string; // Default: undefined
    timezone?: number; // Default: 0
    language?: string; // Default: "en"
  };
  packages: T[];
};

export type Package =
  | string
  | {
      name: string;
      active?: boolean; // Default: true
      namespaces?: string | string[]; // Default: ["all"; "available"; "namespaces"];
      settings?: object;
    };

export type AllSettings<T = Package> = Settings<T> | Settings<T>[];
