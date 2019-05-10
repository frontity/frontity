declare module "@frontity/connect" {
  import { ComponentType, ComponentProps } from "react";

  export function observable<Observable extends object>(
    obj?: Observable
  ): Observable;
  export function isObservable(obj: object): boolean;
  export function raw<Observable extends object>(obj: Observable): Observable;

  interface Scheduler {
    add: Function;
    delete: Function;
  }

  interface ObserveOptions {
    scheduler?: Scheduler | Function;
    debugger?: Function;
    lazy?: boolean;
  }

  export function observe<Reaction extends Function>(
    func: Reaction,
    options?: ObserveOptions
  ): Reaction;
  export function unobserve(func: Function): void;

  // Resolves the derived state for things like Action and Derived.
  type ResolveState<State> = {
    [P in keyof State]: State[P] extends (state: object) => any
      ? ReturnType<State[P]>
      : ResolveState<State[P]>
  };

  export function createStore<S extends object, A extends object>({
    state,
    actions
  }: {
    state?: S;
    actions?: A;
  }): { state: S; actions: A; getSnapshot: () => S };

  export const Provider: React.ProviderExoticComponent<
    React.ProviderProps<any>
  >;

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface Store {
    [key: string]: object;
  }

  export type ExternalProps<T extends Store> = Omit<
    T,
    "state" | "actions" | "libraries" | "roots" | "fills"
  >;

  function connect<Comp extends ComponentType<any>>(
    comp: Comp
  ): ComponentType<ExternalProps<ComponentProps<Comp>>>;

  export default connect;
}
