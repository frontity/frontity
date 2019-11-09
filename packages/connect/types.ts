/**
 * Interface of a store that contains state, actions an optionally libraries.
 * It's meant to be extended by the final store.
 */
export interface Store {
  state: object;
  actions: object;
  libraries?: object;
}

/**
 * The options that can be passed to a proxify function.
 */
export interface ProxifyOptions {
  owner?: {
    type: "debug" | "action" | "component" | "when";
    name?: string;
  };
  mode?: "development" | "production";
}

/**
 * Returns the state object of the store, but substituting the derived state functions for its return type.
 * It's meant to be used when the state is finally consumed, like in actions or components.
 *
 * For example:
 *  - `const userLength = ({ state }) => state.users.length;` can be used like a property: `state.userLength`.
 *  - `const userName = ({ state }) => index => state.users[index].name;` can be called with only the `index` argument: `state.userName(3)`.
 *
 * @param StoreType A store object containing state, actions and libraries.
 */
export type State<StoreType extends Store> = IterableState<StoreType["state"]>;

// This is only a helper for State that can iterate recursively after receiving the state.
type IterableState<State extends object> = {
  [P in keyof State]: State[P] extends (...args: unknown[]) => unknown
    ? ReturnType<State[P]>
    : State[P] extends object
    ? IterableState<State[P]>
    : State[P]
};

/**
 * Returns the actions object of the store, but removing the need to pass the argument of the first function.
 * It's meant to be used when the state is finally consumed, like in actions or components.
 *
 * For example:
 *  - `const changeUser = ({ state }) => { state.user = "Jon"; };` can be called without arguments: `changeUser()`.
 *  - `const changeUser = ({ state }) => name => { state.user = name; };` can be called with only the `name` argument: `changeUser("Jon")`.
 *
 * @param StoreType A store object containing state, actions and libraries.
 */
export type Actions<StoreType extends Store> = IterableActions<
  StoreType["actions"]
>;

// This is only a helper for Actions that can iterate recursively after receiving the actions object.
type IterableActions<RawActions extends object> = {
  [P in keyof RawActions]: RawActions[P] extends (
    store: Store
  ) => (...args: infer Args) => Promise<void>
    ? (...args: Args) => Promise<void>
    : RawActions[P] extends (store: Store) => (...args: infer Args) => void
    ? (...args: Args) => void
    : RawActions[P] extends (store: Store) => void
    ? () => ReturnType<RawActions[P]>
    : RawActions[P] extends object
    ? IterableActions<RawActions[P]>
    : never
};

/**
 * It constructs an action obje based on a raw state, its optional arguments and the
 * returned value.
 *
 * There are two types of derived state functions:
 *  - Without optional arguments: `({ state }) => state.users[0].name`
 *  - With optional arguments: `({ state }) => id => state.users[id].name`
 *
 * It resolves the raw state (the derived state function receives the other derived state as
 * primitives).
 *
 * Examples:
 *  - `Derived<RawState, string>` ---> `({ state }) => state.users[0].name`
 *  - `Derived<RawState, number, string>` ---> `({ state }) => id => state.users[id].name`
 *
 * @param RawState
 * A object that can contain both raw state and dervided state.
 * @param ArgumentOrReturnValueX
 * The arguments of the derived function (if it has arguments). The last one is used as returned value.
 * @param ReturnValue
 * The output if the derived function has arguments.
 */
/**
 * It constructs an action function using the store as the input of the first functions and the
 * rest of the inputs as the arguments of the second function.
 * It's meant to be used when defining the action.
 *
 * Examples:
 *  - `Action<YourStore>` ---> `({ state }) => { state.user = "Jon"; }`
 *  - `Action<YourStore, string>` ---> `({ state }) => name => { state.user = name; }`
 *  - `Action<YourStore, number, string>` ---> `({ state }) => (id, name) => { state.users[id].name = name; }`
 *
 * @param StoreType
 * The store containing both the state and actions.
 * @param ArgumentX
 * The arguments of the action function. Supports up to 10 arguments.
 */
export type Action<
  StoreType extends Store,
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
  ? (store: ProxifiedStore<StoreType>) => void
  : [Argument2] extends [null]
  ? (store: ProxifiedStore<StoreType>) => (arg1: Argument1) => void
  : [Argument3] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (arg1: Argument1, arg2: Argument2) => void
  : [Argument4] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (arg1: Argument1, arg2: Argument2, arg3: Argument3) => void
  : [Argument5] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4
    ) => void
  : [Argument6] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5
    ) => void
  : [Argument7] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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

// This is a helper that returns the same object but with the state and actions
// ready to be consumed.
type ProxifiedStore<StoreType extends Store> = Omit<
  StoreType,
  "state" | "actions"
> & {
  state: State<StoreType>;
  actions: Actions<StoreType>;
};

/**
 * It constructs an action obje based on a raw state, its optional arguments and the
 * returned value.
 *
 * There are two types of derived state functions:
 *  - Without optional arguments: `({ state }) => state.users[0].name`
 *  - With optional arguments: `({ state }) => id => state.users[id].name`
 *
 * It resolves the raw state (the derived state function receives the other derived state as
 * primitives).
 *
 * Examples:
 *  - `Derived<RawState, string>` ---> `({ state }) => state.users[0].name`
 *  - `Derived<RawState, number, string>` ---> `({ state }) => id => state.users[id].name`
 *
 * @param RawState
 * A object that can contain both raw state and dervided state.
 * @param ArgumentOrReturnValueX
 * The arguments of the derived function (if it has arguments). The last one is used as returned value.
 * @param ReturnValue
 * The output if the derived function has arguments.
 */
/**
 * It constructs an action function using the store as the input of the first functions and the
 * rest of the inputs as the arguments of the second function.
 * It's meant to be used when defining the action.
 *
 * Examples:
 *  - `Action<YourStore>` ---> `({ state }) => { state.user = "Jon"; }`
 *  - `Action<YourStore, string>` ---> `({ state }) => name => { state.user = name; }`
 *  - `Action<YourStore, number, string>` ---> `({ state }) => (id, name) => { state.users[id].name = name; }`
 *
 * @param StoreType
 * The store containing both the state and actions.
 * @param ArgumentX
 * The arguments of the action function. Supports up to 10 arguments.
 */
export type AsyncAction<
  StoreType extends Store,
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
  ? (store: ProxifiedStore<StoreType>) => Promise<void>
  : [Argument2] extends [null]
  ? (store: ProxifiedStore<StoreType>) => (arg1: Argument1) => Promise<void>
  : [Argument3] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (arg1: Argument1, arg2: Argument2) => Promise<void>
  : [Argument4] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (arg1: Argument1, arg2: Argument2, arg3: Argument3) => Promise<void>
  : [Argument5] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4
    ) => Promise<void>
  : [Argument6] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
    ) => (
      arg1: Argument1,
      arg2: Argument2,
      arg3: Argument3,
      arg4: Argument4,
      arg5: Argument5
    ) => Promise<void>
  : [Argument7] extends [null]
  ? (
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
      store: ProxifiedStore<StoreType>
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
 * It constructs a derived state function using the store as the input of the first functions, the
 * rest of the inputs as the arguments of the second function and finally the last input as the returned
 * value of the function.
 * It's meant to be used when defining the derived state function.
 *
 * Examples:
 *  - `Derived<YourStore, string>` ---> `({ state }) => state.users[0].profile.name`
 *  - `Derived<YourStore, number, string>` ---> `({ state }) => id => state.users[id].profile.name`
 *  - `Derived<YourStore, number, string, string>` ---> `({ state }) => (id, prop) => state.users[id].profile[prop]`
 *
 * @param StoreType
 * The store containing both the state and actions.
 * @param ArgumentOrReturnValueX
 * The arguments of the derived function (if it has arguments). The last one is used as returned value.
 * Supports up to 10 arguments.
 * @param ReturnValue
 * The output if the derived function has arguments.
 */
export type Derived<
  StoreType extends Store,
  ArgumentOrReturnValue1,
  ArgumentOrReturnValue2 = null,
  ArgumentOrReturnValue3 = null,
  ArgumentOrReturnValue4 = null,
  ArgumentOrReturnValue5 = null,
  ArgumentOrReturnValue6 = null,
  ArgumentOrReturnValue7 = null,
  ArgumentOrReturnValue8 = null,
  ArgumentOrReturnValue9 = null,
  ArgumentOrReturnValue10 = null,
  ReturnValue = null
> = [ArgumentOrReturnValue2] extends [null]
  ? ({ state }: { state: State<StoreType> }) => ArgumentOrReturnValue1
  : [ArgumentOrReturnValue3] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (arg1: ArgumentOrReturnValue1) => ArgumentOrReturnValue2
  : [ArgumentOrReturnValue4] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2
    ) => ArgumentOrReturnValue3
  : [ArgumentOrReturnValue5] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3
    ) => ArgumentOrReturnValue4
  : [ArgumentOrReturnValue6] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4
    ) => ArgumentOrReturnValue5
  : [ArgumentOrReturnValue7] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5
    ) => ArgumentOrReturnValue6
  : [ArgumentOrReturnValue8] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5,
      arg6: ArgumentOrReturnValue6
    ) => ArgumentOrReturnValue7
  : [ArgumentOrReturnValue9] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5,
      arg6: ArgumentOrReturnValue6,
      arg7: ArgumentOrReturnValue7
    ) => ArgumentOrReturnValue8
  : [ArgumentOrReturnValue10] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5,
      arg6: ArgumentOrReturnValue6,
      arg7: ArgumentOrReturnValue7,
      arg8: ArgumentOrReturnValue8
    ) => ArgumentOrReturnValue9
  : [ReturnValue] extends [null]
  ? (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5,
      arg6: ArgumentOrReturnValue6,
      arg7: ArgumentOrReturnValue7,
      arg8: ArgumentOrReturnValue8,
      arg9: ArgumentOrReturnValue9
    ) => ArgumentOrReturnValue10
  : (store: {
      state: State<StoreType>;
      libraries: StoreType["libraries"];
    }) => (
      arg1: ArgumentOrReturnValue1,
      arg2: ArgumentOrReturnValue2,
      arg3: ArgumentOrReturnValue3,
      arg4: ArgumentOrReturnValue4,
      arg5: ArgumentOrReturnValue5,
      arg6: ArgumentOrReturnValue6,
      arg7: ArgumentOrReturnValue7,
      arg8: ArgumentOrReturnValue8,
      arg9: ArgumentOrReturnValue9,
      arg10: ArgumentOrReturnValue10
    ) => ReturnValue;

/**
 * Creates a new props object joining together the connected store and the normal props object.
 * It's meant to be used on components that are going to be connected.
 *
 * Examples:
 *  - `const Comp: React.FC<Connect<YourStore, { prop1: string }>> = ({ state, actions, libraries, prop1 }) => <div>...</div>`
 *  - `class Comp extends React.Component<Connect<YourStore, { prop1: string }>> { render() { return <div>...</div>; }}`
 *
 * @param StoreType
 * The store containing both state, actions and libraries.
 * @param Props
 * The normal props object of this component.
 *
 */
export type Connect<StoreType extends Store, Props extends object = {}> = Omit<
  StoreType,
  "state" | "actions"
> & {
  state: State<StoreType>;
  actions: Actions<StoreType>;
} & Props;

// This is only a helper to filter the properties of a store included in a bigger object.
export type FilterStore<StoreType extends Store> = Omit<
  StoreType,
  "state" | "actions" | "libraries"
>;
