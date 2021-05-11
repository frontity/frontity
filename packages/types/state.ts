import { Package } from ".";
import { ResolveState } from "./utils";

/**
 * The state of a Frontity application, resolved from the state defined in the
 * packages and/or settings.
 */
export type State<Pkg extends Package> = ResolveState<Pkg["state"]>;

export default State;
