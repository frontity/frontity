/* eslint-disable jsdoc/require-jsdoc */

import Package from "./package";
import { ResolveState, ResolveActions, Serializable } from "./utils";

/**
 * Derived state is state that is calculated based on other piece of state in
 * your application.
 *
 * Derived state can have one of three types:
 * 1. JS serializable value (number, string, etc). In this case, there is no
 *   "derivation" happening.
 * 2. Function which takes the application state, actions and libraries as
 *   arguments. The final state is calculated by invoking that function.
 * 3. A curried function, which takes takes the application state, actions and libraries as
 *   arguments and returns a function that takes any number of parameters. That
 *   function works like a "getter" for a piece of state.
 */
export type Derived<Pkg extends Package, InputOrOutput, Output = null> = [
  InputOrOutput
] extends [Serializable]
  ? InputOrOutput
  : [Output] extends [null]
  ? ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => InputOrOutput
  : ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (input: InputOrOutput) => Output;

export default Derived;
