declare module "@frontity/connect" {
  import { ComponentType, ComponentProps } from "react";

  interface Scheduler {
    add: Function;
    delete: Function;
  }

  interface ObserveOptions {
    scheduler?: Scheduler | Function;
    debugger?: Function;
    lazy?: boolean;
  }

  interface Store {
    state?: object;
    actions?: object;
  }

  type ResolveState<State> = {
    [P in keyof State]: State[P] extends (state: object) => any
      ? ReturnType<State[P]>
      : ResolveState<State[P]>
  };

  type ResolveActions<Actions> = {
    [P in keyof Actions]: Actions[P] extends (
      ...a: any
    ) => (arg: infer Arg) => void
      ? (arg: Arg) => void
      : Actions[P] extends (state: object) => any
      ? () => void
      : ResolveActions<Actions[P]>
  };

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type FilterInjectedProps<T extends Store> = Omit<T, "state" | "actions">;

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

  export function createStore<St extends Store>(
    store: St
  ): Omit<St, "state" | "actions"> & {
    state: ResolveState<St["state"]>;
    actions: ResolveActions<St["actions"]>;
    getSnapshot: () => St["state"];
  };

  function connect<Comp extends ComponentType<any>>(
    comp: Comp
  ): ComponentType<FilterInjectedProps<ComponentProps<Comp>>>;

  export const Provider: React.ProviderExoticComponent<
    React.ProviderProps<any>
  >;

  export default connect;
}
