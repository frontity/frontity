import Package from "./package";

export interface MonoSettings<T = Package> {
  name?: string;
  matches?: string[];
  mode?: string;
  settings?: {
    url?: string;
    title?: string;
    timezone?: number;
    language?: string;
  };
  packages: (string | T)[];
}

export interface MultiSettings<T = Package> extends MonoSettings<T> {
  name: string;
}

type Settings<T = Package> = MonoSettings<T> | MultiSettings<T>[];

export default Settings;
