import Package from "./package";
import { ResolveState, ResolveActions } from "./utils";

export type Derived<Pkg extends Package, InputOrOutput, Output = null> = [
  Output
] extends [null]
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
