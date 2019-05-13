import { Package } from ".";
import { ResolveState } from "./utils";

export type State<Pkg extends Package> = ResolveState<Pkg["state"]>;

export default State;
