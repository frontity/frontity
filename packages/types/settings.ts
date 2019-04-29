import { Package } from "./";
import { DeepPartial } from "./utils";

// Gets a Package and returns only what's needed for the frontity.settings.js file.
type PackageForSettings<Pkg extends Package> = [Pkg] extends [never]
  ? never
  : {
      name: Required<Pkg["name"]>;
      active?: boolean;
      namespaces?: Pkg["namespaces"];
      settings?: DeepPartial<Pkg["state"]["settings"]>;
    };

export interface MonoSettings<Pkg = Package> {
  name?: string;
  matches?: string[];
  mode?: string;
  settings?: {
    url?: string;
    title?: string;
    timezone?: number;
    language?: string;
  };
  packages: (string | PackageForSettings<Pkg>)[];
}

export interface MultiSettings<Pkg = Package> extends MonoSettings<Pkg> {
  name: string;
}
