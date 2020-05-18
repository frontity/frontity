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
  /**
   * Connect a React component to the Frontity state manager.
   *
   * From interface {@link ConnectFunction}
   *
   * This function returns the same component it receives but passing
   * `state`, `actions` and `libraries` as properties, and making it reactive
   * to changes on the state.
   *
   * @param Comp React component
   * @param options Options object
   *
   * @return Input component connected to Frontity state
   */
  <Comp extends FunctionComponent<any>>(comp: Comp): FunctionComponent<
    FilterInjectedProps<ComponentProps<Comp>>
  >;
  /**
   * Connect a React component to the Frontity state manager.
   *
   * From interface {@link ConnectFunction}
   *
   * This function returns the same component it receives but passing
   * `state`, `actions` and `libraries` as properties, and making it reactive
   * to changes on the state.
   *
   * @param Comp React component
   * @param options Options object
   *
   * @return Input component connected to Frontity state
   */
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
