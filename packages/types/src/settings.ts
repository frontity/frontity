import { Package } from ".";
import { DeepPartial } from "ts-essentials";

// Gets a Package and returns only what's needed for the frontity.settings.js file.
type PackageForSettings<Pkg> = Pkg extends Package
  ? {
      name: Required<Pkg["name"]>;
      active?: boolean;
      state?: DeepPartial<Pkg["state"]>;
    }
  : never;

export interface MonoSettings<Pkg extends Package = Package> {
  name?: string;
  match?: string[];
  mode?: string;
  state?: object;
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
