import Package from "./package";
import { ResolveState, Omit } from "./utils";

// Resolves the actions for things like Action and Derived.
export type ResolveActions<Actions extends Package["state"]> = {
  [P in keyof Actions]: Actions[P] extends (
    ...a: any
  ) => (arg: infer Arg) => void // Turns "state => args => {}" into "args => {}"
    ? (arg: Arg) => void // Turns "state => {}" into "() => {}"
    : Actions[P] extends (state: Package["state"]) => any
    ? () => void
    : ResolveActions<Actions[P]>
};

export type Connect<S extends Package, Props extends object = {}> = Omit<
  S,
  "state" | "actions" | "name" | "namespaces"
> & {
  state: ResolveState<S["state"]>;
  actions: ResolveActions<S["actions"]>;
} & Props;

export default Connect;
