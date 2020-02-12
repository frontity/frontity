import Package from "./package";
import { ResolveState, ResolveActions } from "./utils";
import Koa from "koa";

export type Action<Pkg extends Package, Input = null> = [Input] extends [null]
  ? ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => void
  : ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (args: Input) => void;

/**
 *  Type for asynchronous actions.
 *  The `Input` corresponds to the second (optional) curried parameter passed to the action.abs
 *
 *  @example
 *  ```
 *  import { AsyncAction } from '@frontity/types';
 *  interface Input = {
 *    input: string;
 *  }
 *
 *  const actions: { myCustomAction: AsyncAction<MyPackage, Input> } = {
 *    myCustomAction: ({ state, libraries }) => async ({ input }) => {
 *      const result = await somePromise();
 *      console.log(input);
 *     }
 *  }
 *  ```
 *
 *  Or simply:
 *  @example
 *  ```
 *  import { AsyncAction } from '@frontity/types';
 *
 *  const actions: { myCustomAction: AsyncAction<MyPackage>} = {
 *    myCustomAction: async ({ state, libraries }) => {
 *      const result = await somePromise();
 *     }
 *  }
 *
 */
export type AsyncAction<Pkg extends Package, Input = null> = [Input] extends [
  null
]
  ? ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => Promise<void>
  : ({
      state,
      actions,
      libraries
    }: {
      state: ResolveState<Pkg["state"]>;
      actions: ResolveActions<Pkg["actions"]>;
      libraries: Pkg["libraries"];
    }) => (args: Input) => Promise<void>;

type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;

export type ServerAction<Pkg> =
  | Action<Pkg>
  | Action<Pkg, Context>
  | AsyncAction<Pkg>
  | AsyncAction<Pkg, Context>;
