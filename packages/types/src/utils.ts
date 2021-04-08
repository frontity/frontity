import { Package } from ".";
import Derived from "./derived";

/**
 * Frontity properties injected to actions.
 *
 * @typeparam Packages - All package definitions together.
 */
export interface ResolvePackages<Packages extends Package> {
  /**
   * State from all packages resolved.
   */
  state: ResolveState<Packages["state"]>;

  /**
   * Actions from all packages resolved.
   */
  actions: ResolveActions<Packages["actions"]>;

  /**
   * Libraries from all packages.
   */
  libraries: Packages["libraries"];
}

/**
 * Resolve derived state to its final form.
 */
export type ResolveState<State extends Package["state"]> = {
  [P in keyof State]: State[P] extends (state: Package["state"]) => any
    ? ReturnType<State[P]>
    : State[P] extends Serializable | ((state: Package["state"]) => any)
    ? Exclude<State[P], Derived<any, any>>
    : ResolveState<State[P]>;
};

/**
 * Resolve actions to its final form.
 */
export type ResolveActions<Actions extends Package["state"]> = {
  [P in keyof Actions]: Actions[P] extends ({
    state,
    actions,
    libraries,
  }: ResolvePackages<Package>) => (...args: any[]) => void | Promise<void>
    ? (
        ...args: Parameters<ReturnType<Actions[P]>>
      ) => ReturnType<ReturnType<Actions[P]>>
    : Actions[P] extends ({
        state,
        actions,
        libraries,
      }: ResolvePackages<Package>) => void | Promise<void>
    ? () => ReturnType<Actions[P]>
    : ResolveActions<Actions[P]>;
};

/**
 * Util to filter the injected props from connect.
 */
export type FilterInjectedProps<T extends Package> = Omit<
  T,
  "state" | "actions" | "libraries" | "roots" | "fills"
>;

/**
 * Representing a primitive value in JS (and null):
 * https://developer.mozilla.org/en-US/docs/Glossary/Primitive.
 */
type Primitive = number | string | boolean | symbol | undefined | null;

/**
 * Represents the values that can be "serializable" in javascript.
 */
export type Serializable =
  | Primitive
  | (Primitive | Record<string, Primitive>)[]
  | Record<string, Primitive>;
