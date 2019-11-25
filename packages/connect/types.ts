/**
 * The raw store object that contains state, actions an optionally libraries.
 * It's meant to be extended by the final user store.
 */
export interface StoreType {
  state: object;
  actions: object;
  libraries?: object;
}

/**
 * Helper to make all properties in Type readonly recursively.
 *
 * @param Type Any type.
 */
type RecursiveReadonly<Type> = {
  readonly [P in keyof Type]: Type[P] extends (...args: unknown[]) => unknown
    ? Type[P]
    : Type[P] extends object
    ? RecursiveReadonly<Type[P]>
    : Type[P]
};

/**
 * The observable state object of the store. It substitues the derived state functions for its return type.
 * It's meant to be used when the state needs to be observed, like in components or when functions.
 *
 * For example, the derived state:
 *  - `const userLength = ({ state }) => state.users.length;` can be used like a property: `state.userLength`.
 *  - `const userName = ({ state }) => index => state.users[index].name;` can be called with only the `index` argument: `state.userName(3)`.
 *
 * @param Store A store object containing state, actions and libraries.
 */
export type ObservableState<Store extends StoreType> = RecursiveReadonly<
  IterableState<Store["state"]>
>;

/**
 * The mutable state object of the store. It substitues the derived state functions for its return type.
 * It's meant to be used when the state can be mutated, like in actions.
 *
 * TODO: Make derived functions readonly.
 *
 * For example, the derived state:
 *  - `const userLength = ({ state }) => state.users.length;` can be used like a property: `state.userLength`.
 *  - `const userName = ({ state }) => index => state.users[index].name;` can be called with only the `index` argument: `state.userName(3)`.
 *
 * @param Store A store object containing state, actions and libraries.
 */
export type MutableState<Store extends StoreType> = IterableState<
  Store["state"]
>;

/**
 * Helper to iterate recursively after receiving the state.
 *
 * @param State The state object.
 */
type IterableState<State extends object> = {
  [P in keyof State]: State[P] extends (...args: unknown[]) => unknown
    ? ReturnType<State[P]>
    : State[P] extends object
    ? IterableState<State[P]>
    : State[P]
};

/**
 * The observable actions object of the store. It removes the need to pass the
 * argument of the first function. Observable actions should not be called.
 * It's meant to be used when the actions need to be only observed, like in when functions.
 *
 * TODO: Decide what to return instead of the function, maybe a boolean or an object
 * cotaining { args, name }.
 *
 * @param Store A store object containing state, actions and libraries.
 */
export type ObservableActions<Store extends StoreType> = RecursiveReadonly<
  IterableObservableActions<Store["actions"]>
>;

/**
 * Helper to iterate recursively after receiving the actions.
 *
 * @param Actions The actions object.
 */
type IterableObservableActions<Actions extends object> = {
  [P in keyof Actions]: Actions[P] extends (store: StoreType) => unknown
    ? boolean
    : Actions[P] extends object
    ? IterableObservableActions<Actions[P]>
    : never
};

/**
 * The executable actions of the store. It removes the need to pass the argument of the first function.
 * It's meant to be used when the actions need to be executed, like in components or other actions.
 *
 * @param Store A store object containing state, actions and libraries.
 */
export type ExecutableActions<Store extends StoreType> = RecursiveReadonly<
  IterableExecutableActions<Store["actions"]>
>;

/**
 * Helper to iterate recursively after receiving the actions.
 *
 * @param Actions The actions object.
 */
type IterableExecutableActions<Actions extends object> = {
  [P in keyof Actions]: Actions[P] extends (
    store: StoreType
  ) => (...args: infer Args) => Promise<void>
    ? (...args: Args) => Promise<void>
    : Actions[P] extends (store: StoreType) => (...args: infer Args) => void
    ? (...args: Args) => void
    : Actions[P] extends (store: StoreType) => void
    ? () => ReturnType<Actions[P]>
    : Actions[P] extends object
    ? IterableExecutableActions<Actions[P]>
    : never
};

/**
 * The store injected in the when functions.
 *
 * @param Store
 * The store containing the state, actions and libraries.
 */
type WhenStore<Store extends StoreType> = {
  state: ObservableState<Store>;
  actions: ObservableActions<Store>;
};

/**
 * The function passed to when. It receives the observable state and actions.
 *
 * @param Store
 * The store containing the state, actions and libraries.
 * @param Return
 * The return value of the when function.
 */
export interface When<Store extends StoreType, Return> {
  (store: WhenStore<Store>): Return;
}

/**
 * The store passed to actions, with mutable state, executable actions,
 * libraries and the when function.
 * It's meant to be used inside actions.
 *
 * @param Store
 * The store containing the state, actions and libraries.
 */
type ActionsStore<Store extends StoreType> = {
  state: MutableState<Store>;
  actions: ExecutableActions<Store>;
  libraries: Store["libraries"];
  when: <Store extends StoreType, Return>(
    observer: When<Store, Return>
  ) => Promise<Return>;
};

/**
 * An action function. It uses the store as the input of the first functions and the
 * rest of the inputs as the arguments of the second function.
 * It's meant to be used when defining the action.
 *
 * Examples:
 *  - `Action<YourStore>` ---> `({ state }) => { state.user = "Jon"; }`
 *  - `Action<YourStore, string>` ---> `({ state }) => name => { state.user = name; }`
 *  - `Action<YourStore, number, string>` ---> `({ state }) => (id, name) => { state.users[id].name = name; }`
 *
 * @param Store
 * The store containing the state, actions and libraries.
 * @param ArgumentX
 * The arguments of the action function. Supports up to 10 arguments.
 */
export type Action<
  Store extends StoreType,
  Argument1 = null,
  Argument2 = null,
  Argument3 = null,
  Argument4 = null,
  Argument5 = null,
  Argument6 = null,
  Argument7 = null,
  Argument8 = null,
  Argument9 = null,
  Argument10 = null
> = [Argument1] extends [null]
  ? (store: ActionsStore<Store>) => void
  : [Argument2] extends [null]
  ? (store: ActionsStore<Store>) => (arg1: Argument1) => void
  : [Argument3] extends [null]
  ? (store: ActionsStore<Store>) => (arg1: Argument1, arg2: Argument2) => void
  : [Argument4] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (arg1: Argument1, arg2: Argument2, arg3: Argument3) => void
  : [Argument5] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4
    ) => void
  : [Argument6] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5
    ) => void
  : [Argument7] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6
    ) => void
  : [Argument8] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7
    ) => void
  : [Argument9] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8
    ) => void
  : [Argument10] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8,
      arg9: Argument9
    ) => void
  : (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8,
      arg9: Argument9,
      arg10: Argument10
    ) => void;

/**
 * An async action function. It uses the store as the input of the first functions and the
 * rest of the inputs as the arguments of the second function.
 * It's meant to be used when defining the async action.
 *
 * Examples:
 *  - `AsyncAction<YourStore>` ---> `async ({ state }) => { state.user = "Jon"; }`
 *  - `AsyncAction<YourStore, string>` ---> `({ state }) => async name => { state.user = name; }`
 *  - `AsyncAction<YourStore, number, string>` ---> `({ state }) => async (id, name) => { state.users[id].name = name; }`
 *
 * @param Store
 * The store containing the state, actions and libraries.
 * @param ArgumentX
 * The arguments of the action function. Supports up to 10 arguments.
 */
export type AsyncAction<
  Store extends StoreType,
  Argument1 = null,
  Argument2 = null,
  Argument3 = null,
  Argument4 = null,
  Argument5 = null,
  Argument6 = null,
  Argument7 = null,
  Argument8 = null,
  Argument9 = null,
  Argument10 = null
> = [Argument1] extends [null]
  ? (store: ActionsStore<Store>) => Promise<void>
  : [Argument2] extends [null]
  ? (store: ActionsStore<Store>) => (arg1: Argument1) => Promise<void>
  : [Argument3] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (arg1: Argument1, arg2: Argument2) => Promise<void>
  : [Argument4] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (arg1: Argument1, arg2: Argument2, arg3: Argument3) => Promise<void>
  : [Argument5] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4
    ) => Promise<void>
  : [Argument6] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5
    ) => Promise<void>
  : [Argument7] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6
    ) => Promise<void>
  : [Argument8] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7
    ) => Promise<void>
  : [Argument9] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8
    ) => Promise<void>
  : [Argument10] extends [null]
  ? (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8,
      arg9: Argument9
    ) => Promise<void>
  : (
      store: ActionsStore<Store>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5,
      arg6: Argument6,
      arg7: Argument7,
      arg8: Argument8,
      arg9: Argument9,
      arg10: Argument10
    ) => Promise<void>;

/**
 * The store passed to derived functions, containing the observable state and the libraries.
 *
 * @param Store
 * The store containing the state, actions and libraries.
 */
type DerivedStore<Store extends StoreType> = {
  state: ObservableState<Store>;
  libraries: Store["libraries"];
};

/**
 * A derived state function. It uses the store as the input of the first functions, the
 * rest of the inputs as the arguments of the second function and finally the last input as the returned
 * value of the function.
 * It's meant to be used when defining the derived state function.
 *
 * Examples:
 *  - `Derived<YourStore, string>` ---> `({ state }) => state.users[0].profile.name`
 *  - `Derived<YourStore, number, string>` ---> `({ state }) => id => state.users[id].profile.name`
 *  - `Derived<YourStore, number, string, string>` ---> `({ state }) => (id, prop) => state.users[id].profile[prop]`
 *
 * @param Store
 * The store containing both the state and the libraries.
 * @param ArgumentOrReturnX
 * The arguments of the derived function (if it has arguments). The last one is used as returned value.
 * Supports up to 10 arguments.
 * @param Return
 * The output if the derived function has arguments.
 */
export type Derived<
  Store extends StoreType,
  ArgumentOrReturn1,
  ArgumentOrReturn2 = null,
  ArgumentOrReturn3 = null,
  ArgumentOrReturn4 = null,
  ArgumentOrReturn5 = null,
  ArgumentOrReturn6 = null,
  ArgumentOrReturn7 = null,
  ArgumentOrReturn8 = null,
  ArgumentOrReturn9 = null,
  ArgumentOrReturn10 = null,
  Return = null
> = [ArgumentOrReturn2] extends [null]
  ? (store: DerivedStore<Store>) => ArgumentOrReturn1
  : [ArgumentOrReturn3] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (arg1: ArgumentOrReturn1) => ArgumentOrReturn2
  : [ArgumentOrReturn4] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (arg1: ArgumentOrReturn1, arg2: ArgumentOrReturn2) => ArgumentOrReturn3
  : [ArgumentOrReturn5] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3
    ) => ArgumentOrReturn4
  : [ArgumentOrReturn6] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4
    ) => ArgumentOrReturn5
  : [ArgumentOrReturn7] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5
    ) => ArgumentOrReturn6
  : [ArgumentOrReturn8] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5,
      arg6: ArgumentOrReturn6
    ) => ArgumentOrReturn7
  : [ArgumentOrReturn9] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5,
      arg6: ArgumentOrReturn6,
      arg7: ArgumentOrReturn7
    ) => ArgumentOrReturn8
  : [ArgumentOrReturn10] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5,
      arg6: ArgumentOrReturn6,
      arg7: ArgumentOrReturn7,
      arg8: ArgumentOrReturn8
    ) => ArgumentOrReturn9
  : [Return] extends [null]
  ? (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5,
      arg6: ArgumentOrReturn6,
      arg7: ArgumentOrReturn7,
      arg8: ArgumentOrReturn8,
      arg9: ArgumentOrReturn9
    ) => ArgumentOrReturn10
  : (
      store: DerivedStore<Store>
    ) => (
      arg1: ArgumentOrReturn1,
      arg2: ArgumentOrReturn2,
      arg3: ArgumentOrReturn3,
      arg4: ArgumentOrReturn4,
      arg5: ArgumentOrReturn5,
      arg6: ArgumentOrReturn6,
      arg7: ArgumentOrReturn7,
      arg8: ArgumentOrReturn8,
      arg9: ArgumentOrReturn9,
      arg10: ArgumentOrReturn10
    ) => Return;

/**
 * Creates a new props object joining together the connected store and the normal props object.
 * It's meant to be used on components that are going to be connected.
 *
 * Examples:
 *  - `const Comp: React.FC<Connect<YourStore, { prop1: string }>> = ({ state, actions, libraries, prop1 }) => <div>...</div>`
 *  - `class Comp extends React.Component<Connect<YourStore, { prop1: string }>> { render() { return <div>...</div>; }}`
 *
 * @param Store
 * The store containing state, actions and libraries.
 * @param Props
 * The normal props object of this component.
 *
 */
export type Connect<Store extends StoreType, Props extends object = {}> = {
  state: ObservableState<Store>;
  actions: ExecutableActions<Store>;
  libraries: Store["libraries"];
} & Props;

/**
 * A helper to filter the properties of a store included in a bigger object, for example, when
 * the store is merged with React props.
 *
 * @param Store
 * The store containing state, actions and libraries.
 */
export type FilterStore<Store extends StoreType> = Omit<
  Store,
  "state" | "actions" | "libraries"
>;

/**
 * Options passed when creating a new Store.
 */
export interface StoreOptions {
  mode?: "development" | "production";
}

/**
 * Context that can be passed to a method that creates proxies,
 * like store.createObservableState, store.createMutableState, store.createObservableActions,
 * or store.createExecutableActions.
 */
export interface Owner {
  type: "debug" | "action" | "component" | "when";
  name: string;
  parent?: Owner;
}

/**
 * Middleware callback for observable proxies, like store.createObservableState
 * or store.createObservableActions.
 */
export interface ObservableMiddlewareCallback {
  (args: { path: string; target: object; key: string; owner: Owner }): void;
}

/**
 * Middleware callback for mutable proxies, like store.createMutableState.
 */
export interface MutableMiddlewareCallback {
  (args: {
    path: string;
    patch: string[];
    target: object;
    key: string;
    value: unknown;
    owner: Owner;
  }): void;
}

/**
 * Middleware callback for exetuable proxies, like store.createExecutableActions.
 */
export interface ExecutableMiddlewareCallback {
  (args: {
    path: string;
    target: object;
    key: string;
    args: unknown[];
    abort: () => void;
    owner: Owner;
  }): void;
}
