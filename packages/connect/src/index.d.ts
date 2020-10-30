/* eslint-disable jsdoc/require-jsdoc */

/**
 * TSDocs disabled by `@luisherranz` in this file because he needs to figure
 * out first which types will remain when we merge this PR
 * https://github.com/frontity/frontity/pull/415, taking into account that
 * `react-easy-state` and `@nx-js/observer-util` already have types themselves.
 */

interface Scheduler {
  add: Function;
  delete: Function;
}

interface ObserveOptions {
  scheduler?: Scheduler | Function;
  debugger?: Function;
  lazy?: boolean;
}

interface ActionsRecursive<T> {
  [key: string]: T | Function;
}
type Actions = ActionsRecursive<Actions>;

type Store = {
  state?: object;
  actions?: Actions;
};

type Primitive = number | string | boolean | symbol | undefined | null;

type ResolveState<State> = {
  [P in keyof State]: State[P] extends (state: object) => any
    ? ReturnType<State[P]>
    : [State[P]] extends [Primitive | Derived<any, any>]
    ? Exclude<State[P], Derived<any, any>>
    : ResolveState<State[P]>;
};

type ResolveActions<Act extends Actions> = {
  [P in keyof Act]: Act[P] extends (
    ...store: any
  ) => (...actionArgs: any) => void | Promise<void>
    ? (
        ...actionArgs: Parameters<ReturnType<Act[P]>>
      ) => ReturnType<ReturnType<Act[P]>>
    : Act[P] extends (...store: any) => void | Promise<void>
    ? () => ReturnType<Act[P]>
    : Act[P] extends Actions
    ? ResolveActions<Act[P]>
    : any;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type FilterInjectedProps<T extends Store> = Omit<T, "state" | "actions">;

export type Action<St extends Store, Input = null> = [Input] extends [null]
  ? (
      store: Omit<St, "state" | "actions"> & {
        state: ResolveState<St["state"]>;
        actions: ResolveActions<St["actions"]>;
      }
    ) => void
  : (
      store: Omit<St, "state" | "actions"> & {
        state: ResolveState<St["state"]>;
        actions: ResolveActions<St["actions"]>;
      }
    ) => (input: Input) => void;

export type Derived<St extends Store, InputOrOutput, Output = null> = [
  Output
] extends [null]
  ? ({ state }: { state: ResolveState<St["state"]> }) => InputOrOutput
  : ({
      state,
    }: {
      state: ResolveState<St["state"]>;
    }) => (input: InputOrOutput) => Output;

export type Connect<St extends Store, Props extends object = {}> = Omit<
  St,
  "state" | "actions"
> & {
  state: ResolveState<St["state"]>;
  actions: ResolveActions<St["actions"]>;
} & Props;

export type UseConnect<Package extends Store> = Omit<
  Package,
  "state" | "actions"
> & {
  state: ResolveState<Package["state"]>;
  actions: ResolveActions<Package["actions"]>;
};

export function observable<Observable extends object>(
  obj?: Observable
): Observable;

export function isObservable(obj: object): boolean;

export function raw<Observable extends object>(obj: Observable): Observable;

export function observe<Reaction extends Function>(
  func: Reaction,
  options?: ObserveOptions
): Reaction;

export function unobserve(func: Function): void;

export function batch<T = any>(
  fn: (...args: any[]) => T,
  ctx?: any,
  args?: any[]
): T;

export type InitializedStore<St extends Store = Store> = Omit<
  St,
  "state" | "actions"
> & {
  state: ResolveState<St["state"]>;
  actions: ResolveActions<St["actions"]>;
};

export function getSnapshot(state: object): object;

export function createStore<St extends Store>(store: St): InitializedStore<St>;

export type ConnectOptions = {
  injectProps?: boolean;
};

declare function connect<Props extends object>(
  Component: React.ComponentType<Props>,
  options?: ConnectOptions
): React.FunctionComponent<FilterInjectedProps<Props>>;

export const Provider: React.ProviderExoticComponent<React.ProviderProps<any>>;

export function useConnect<Package extends Store>(): UseConnect<Package>;

export default connect;
