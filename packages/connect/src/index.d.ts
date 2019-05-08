declare module "@frontity/connect" {
  function observable<Observable extends object>(obj?: Observable): Observable;
  function isObservable(obj: object): boolean;
  function raw<Observable extends object>(obj: Observable): Observable;

  interface Scheduler {
    add: Function;
    delete: Function;
  }

  interface ObserveOptions {
    scheduler?: Scheduler | Function;
    debugger?: Function;
    lazy?: boolean;
  }

  function observe<Reaction extends Function>(
    func: Reaction,
    options?: ObserveOptions
  ): Reaction;
  function unobserve(func: Function): void;

  // Resolves the derived state for things like Action and Derived.
  type ResolveState<State> = {
    [P in keyof State]: State[P] extends (state: object) => any
      ? ReturnType<State[P]>
      : ResolveState<State[P]>
  };

  function createStore<S extends object, A extends object>({
    state,
    actions
  }: {
    state: S;
    actions: A;
  }): { state: S; actions: A; getSnapshot: () => S };
}
