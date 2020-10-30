/* eslint-disable jsdoc/require-jsdoc */
import { Package } from ".";
import Derived from "./derived";

/**
 * Resolve derived state to its final form.
 */
export type ResolveState<State extends Package["state"]> = {
  [P in keyof State]: State[P] extends (state: Package["state"]) => any
    ? ReturnType<State[P]>
    : [State[P]] extends [Serializable | Derived<any, any>]
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
  }: {
    state: ResolveState<Package["state"]>;
    actions: ResolveActions<Package["actions"]>;
    libraries: Package["libraries"];
  }) => (...args: any[]) => void | Promise<void>
    ? (
        ...args: Parameters<ReturnType<Actions[P]>>
      ) => ReturnType<ReturnType<Actions[P]>>
    : Actions[P] extends ({
        state,
        actions,
        libraries,
      }: {
        state: ResolveState<Package["state"]>;
        actions: ResolveActions<Package["actions"]>;
        libraries: Package["libraries"];
      }) => void | Promise<void>
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
