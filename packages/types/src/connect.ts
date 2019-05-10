import { ComponentType, ComponentProps } from "react";
import Package from "./package";
import {
  ResolveState,
  Omit,
  ResolveActions,
  FilterInjectedProps
} from "./utils";

export type Connect<Pkg extends Package, Props extends object = {}> = Omit<
  Pkg,
  "state" | "actions" | "name"
> & {
  state: ResolveState<Pkg["state"]>;
  actions: ResolveActions<Pkg["actions"]>;
} & Props;

export interface ConnectFunction {
  <Comp extends ComponentType<any>>(comp: Comp): ComponentType<
    FilterInjectedProps<ComponentProps<Comp>>
  >;
}

export interface CreateStore {
  <Pkg extends Package>(pkg: Pkg): Omit<Pkg, "state" | "actions"> & {
    state: ResolveState<Pkg["state"]>;
    actions: ResolveActions<Pkg["actions"]>;
    getSnapshot: () => Pkg["state"];
  };
}

export default Connect;
