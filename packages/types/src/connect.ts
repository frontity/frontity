import Package from "./package";
import { ResolveState, Omit, ResolveActions } from "./utils";

export type Connect<S extends Package, Props extends object = {}> = Omit<
  S,
  "state" | "actions" | "name"
> & {
  state: ResolveState<S["state"]>;
  actions: ResolveActions<S["actions"]>;
} & Props;

export type ExternalProps<T extends Package> = Omit<
  T,
  "state" | "actions" | "libraries" | "roots" | "fills"
>;

export default Connect;
