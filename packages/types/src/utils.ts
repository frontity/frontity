import { Package } from ".";

// Resolve derived state to its final form.
export type ResolveState<State extends Package["state"]> = {
  [P in keyof State]: State[P] extends (state: Package["state"]) => any
    ? ReturnType<State[P]>
    : ResolveState<State[P]>
};

// Resolve actions to its final form.
export type ResolveActions<Actions extends Package["state"]> = {
  [P in keyof Actions]: Actions[P] extends ({
    state,
    actions,
    libraries
  }: {
    state: ResolveState<Package["state"]>;
    actions: ResolveActions<Package["actions"]>;
    libraries: Package["libraries"];
  }) => (arg: infer Arg) => void
    ? (arg: Arg) => ReturnType<ReturnType<Actions[P]>>
    : Actions[P] extends ({
        state,
        actions,
        libraries
      }: {
        state: ResolveState<Package["state"]>;
        actions: ResolveActions<Package["actions"]>;
        libraries: Package["libraries"];
      }) => any
    ? () => ReturnType<Actions[P]>
    : ResolveActions<Actions[P]>
};

// Make properties deeply partial.
type DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };
export type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
  ? DeepPartialObject<T>
  : T;
// Omit any property found in the passed object.
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Util to filter the injected props from connect.
export type FilterInjectedProps<T extends Package> = Omit<
  T,
  "state" | "actions" | "libraries" | "roots" | "fills"
>;
