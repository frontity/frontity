declare module "@frontity/connect" {
  import { ComponentType } from "react";

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
    state: S;
    actions: A;
  }): { state: S; actions: A; getSnapshot: () => S };

  export const Provider: React.ProviderExoticComponent<
    React.ProviderProps<any>
  >;

  function connect<Comp extends ComponentType<any>>(comp: Comp): Comp;

  export default connect;
}
