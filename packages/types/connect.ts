import Package from "./package";
import { ResolveState } from "./utils";

// Resolves the actions for things like Action and Derived.
export type ResolveActions<Actions extends Package["state"]> = {
  [P in keyof Actions]: Actions[P] extends (
    ...a: any
  ) => (a: infer Args) => void // Turns "state => args => {}" into "args => {}"
    ? (a: Args) => void // Turns "state => {}" into "() => {}"
    : Actions[P] extends (state: Package["state"]) => any
    ? () => void
    : ResolveActions<Actions[P]>
};

export type Connect<S extends Package, Props extends object = {}> = S & {
  state: ResolveState<S["state"]>;
  actions: ResolveActions<S["actions"]>;
} & Props;

export default Connect;
