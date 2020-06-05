import Package from "./package";
import { ResolveState, ResolveActions } from "./utils";
import Koa from "koa";

/**
 * Tricky utility for defining list of arguments.
 *
 * Hopefully, the https://github.com/microsoft/TypeScript/issues/5453 proposal
 * would avoid this kind of type definitions.
 *
 * @template AN - List of arguments.
 */
type Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10> = [A1] extends [null]
  ? []
  : [A2] extends [null]
  ? [A1]
  : [A3] extends [null]
  ? [A1, A2]
  : [A4] extends [null]
  ? [A1, A2, A3]
  : [A5] extends [null]
  ? [A1, A2, A3, A4]
  : [A6] extends [null]
  ? [A1, A2, A3, A4, A5]
  : [A7] extends [null]
  ? [A1, A2, A3, A4, A5, A6]
  : [A8] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7]
  : [A9] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7, A8]
  : [A10] extends [null]
  ? [A1, A2, A3, A4, A5, A6, A7, A8, A9]
  : [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10];

/**
 * Type declaration of a Frontity action.
 *
 * @example
 *
 * Without additional parameters:
 * ```typescript
 * const someAction: Action<Packages> = ({ state, actions, libraries }) => {
 *  // Action content.
 * }
 *
 * // Calling the action:
 * actions.myPackage.someAction();
 * ```
 *
 * @example
 * With additional parameters:
 *
 * ```typescript
 * const someAction: Action<Packages, Args> = ({ state, actions, libraries }) =>
 *   (...args) => {
 *      // Action content.
 *   }
 *
 * // Calling the action:
 * actions.myPackage.someAction("arg 1", "arg 2", ...);
 * ```
 *
 * @template Packages - The definition of all the packages that a Frontity
 * package is aware of.
 * @template An - The arguments of the final action.
 *
 * @returns void
 */
export type Action<
  Packages extends Package,
  A1 = null,
  A2 = null,
  A3 = null,
  A4 = null,
  A5 = null,
  A6 = null,
  A7 = null,
  A8 = null,
  A9 = null,
  A10 = null
> = [A1] extends [null]
  ? ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Packages["state"]>;
      actions: ResolveActions<Packages["actions"]>;
      libraries: Packages["libraries"];
    }) => void
  : ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Packages["state"]>;
      actions: ResolveActions<Packages["actions"]>;
      libraries: Packages["libraries"];
    }) => (...args: Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>) => void;

/**
 * Type declaration of a Frontity async action.
 *
 * @example
 *
 * Without additional parameters:
 * ```typescript
 * const someAction: AsyncAction<Packages> = async ({ state, actions, libraries }) => {
 *  // Action content. It can await.
 * }
 *
 * // Calling the action:
 * actions.myPackage.someAction();
 * ```
 *
 * @example
 * With additional parameters:
 *
 * ```typescript
 * const someAction: AsyncAction<Packages, Args> =
 *   async ({ state, actions, libraries }) => (...args) => {
 *    // Action content. It can await.
 *   }
 *
 * // Calling the action:
 * actions.myPackage.someAction("arg 1", "arg 2", ...);
 * ```
 *
 * @template Packages - The definition of all the packages that a Frontity
 * package is aware of.
 * @template An - The arguments of the final action.
 *
 * @returns Promise<void>
 */
export type AsyncAction<
  Packages extends Package,
  A1 = null,
  A2 = null,
  A3 = null,
  A4 = null,
  A5 = null,
  A6 = null,
  A7 = null,
  A8 = null,
  A9 = null,
  A10 = null
> = [A1] extends [null]
  ? ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Packages["state"]>;
      actions: ResolveActions<Packages["actions"]>;
      libraries: Packages["libraries"];
    }) => Promise<void>
  : ({
      state,
      actions,
      libraries,
    }: {
      state: ResolveState<Packages["state"]>;
      actions: ResolveActions<Packages["actions"]>;
      libraries: Packages["libraries"];
    }) => (
      ...args: Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>
    ) => Promise<void>;

/**
 * The context of a Koa application.
 */
export type Context = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext
>;

/**
 * Type definition for Frontity server actions, like `beforeSSR` or `afterSSR`.
 *
 * @template Packages - The definition of all the packages that a Frontity
 * package is aware of.
 */
export type ServerAction<Packages> = AsyncAction<Packages, { ctx: Context }>;
