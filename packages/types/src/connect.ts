/* eslint-disable jsdoc/require-jsdoc */

/**
 * TSDocs disabled by `@luisherranz` in this file because he needs to figure
 * out first which types will remain when we merge this PR
 * https://github.com/frontity/frontity/pull/415, taking into account that
 * `react-easy-state` and `@nx-js/observer-util` already have types themselves.
 */

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
  <Comp extends FunctionComponent<any>>(
    comp: Comp,
    options?: { injectProps: boolean }
  ): FunctionComponent<FilterInjectedProps<ComponentProps<Comp>>>;
  <Comp extends ComponentClass<any>>(
    comp: Comp,
    options?: { injectProps: boolean }
  ): ComponentClass<FilterInjectedProps<ComponentProps<Comp>>>;
}

export interface CreateStore {
  <Pkg extends Package>(pkg: Pkg): Omit<Pkg, "state" | "actions"> & {
    state: ResolveState<Pkg["state"]>;
    actions: ResolveActions<Pkg["actions"]>;
  };
}

export default Connect;
