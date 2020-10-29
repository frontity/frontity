/* eslint-disable */

import Package from "./package";
import { ResolveState, ResolveActions, Serializable } from "./utils";

/**
 * Derived state can be
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
