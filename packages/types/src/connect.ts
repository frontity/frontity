import { ComponentProps, FunctionComponent, ComponentClass } from "react";
import Package from "./package";
import { ResolveState, ResolveActions, FilterInjectedProps } from "./utils";

export type Connect<Pkg extends Package, Props extends object = {}> = Omit<
  Pkg,
  "state" | "actions" | "name" | "roots" | "fills"
> & {
  state: ResolveState<Pkg["state"]>;
  actions: ResolveActions<Pkg["actions"]>;
} & Props;

export interface ConnectFunction {
  <Comp extends FunctionComponent<any>>(comp: Comp): FunctionComponent<
    FilterInjectedProps<ComponentProps<Comp>>
  >;
  <Comp extends ComponentClass<any>>(comp: Comp): ComponentClass<
    FilterInjectedProps<ComponentProps<Comp>>
  >;
}

export interface CreateStore {
  <Pkg extends Package>(pkg: Pkg): Omit<Pkg, "state" | "actions"> & {
    state: ResolveState<Pkg["state"]>;
    actions: ResolveActions<Pkg["actions"]>;
  };
}

export default Connect;
