import Package from "./package";
import { ResolveState } from "./utils";

export type Action<Pkg extends Package, Input = null> = [Input] extends [null]
  ? (state: ResolveState<Pkg["state"]>) => void
  : (state: ResolveState<Pkg["state"]>) => (input: Input) => void;

export default Action;
