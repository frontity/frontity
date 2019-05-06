import { Package } from ".";
import { DeepPartial } from "./utils";

// Gets a Package and returns only what's needed for the frontity.settings.js file.
type PackageForSettings<Pkg extends Package> = {
  name: Required<Pkg["name"]>;
  active?: boolean;
  exclude?: Pkg["namespaces"];
  settings?: DeepPartial<Pkg["state"]["settings"]>;
};

export interface MonoSettings<Pkg extends Package = Package> {
  name?: string;
  match?: string[];
  mode?: string;
  settings?: {
    url?: string;
    title?: string;
    timezone?: number;
    language?: string;
  };
  packages: (string | PackageForSettings<Pkg>)[];
}

export interface MultiSettings<Pkg extends Package = Package>
  extends MonoSettings<Pkg> {
  name: string;
}

export type Settings<Pkg extends Package = Package> =
  | MonoSettings<Pkg>
  | MultiSettings<Pkg>[];

export default Settings;
