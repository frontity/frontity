import Package from "./package";
import { ResolveState, ResolveActions } from "./utils";

export type Action<Pkg extends Package, Input = null> = [Input] extends [null]
  ? ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => void
  : ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (args: Input) => void;

export default Action;
