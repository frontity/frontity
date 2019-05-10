import Package from "./package";
import { ResolveState } from "./utils";

export type Derived<Pkg extends Package, InputOrOutput, Output = null> = [
  Output
] extends [null]
  ? (state: ResolveState<Pkg["state"]>) => InputOrOutput
  : (state: ResolveState<Pkg["state"]>) => (input: InputOrOutput) => Output;

export default Derived;
