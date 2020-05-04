import {
  ComponentType,
  FunctionComponent,
  ProviderExoticComponent,
  ProviderProps,
} from "react";

interface Scheduler {
  add: Function;
  delete: Function;
}

interface ObserveOptions {
  scheduler?: Scheduler | Function;
  debugger?: Function;
  lazy?: boolean;
}

type Store = {
  state?: object;
  actions?: object;
};

type ResolveState<State> = {
  [P in keyof State]: State[P] extends (state: object) => any
    ? ReturnType<State[P]>
    : ResolveState<State[P]>;
};

type ResolveActions<Actions extends any> = {
  [P in keyof Actions]: Actions[P] extends (
    ...store: any
  ) => (...actionArgs: any) => void | Promise<void>
    ? (
        ...actionArgs: Parameters<ReturnType<Actions[P]>>
      ) => ReturnType<ReturnType<Actions[P]>>
    : Actions[P] extends (...store: any) => void | Promise<void>
    ? () => ReturnType<Actions[P]>
    : ResolveActions<Actions[P]>;
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

declare function connect<Props extends object>(
  Component: ComponentType<Props>
): FunctionComponent<FilterInjectedProps<Props>>;

export const Provider: ProviderExoticComponent<ProviderProps<any>>;

export default connect;
