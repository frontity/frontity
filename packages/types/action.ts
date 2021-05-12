import Package from "./package";
import { ResolvePackages } from "./utils";
import Koa from "koa";

/**
 * Tricky utility for defining list of arguments (up to ten arguments).
 *
 * Hopefully, the https://github.com/microsoft/TypeScript/issues/5453 proposal
 * would avoid this kind of type definitions.
 *
 * @typeparam AN - Argument number N.
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
 * ```typescript
 * // Without parameters:
 * const someAction: Action<Packages> = ({
 *   state,
 *   actions,
 *   libraries
 * }) => { ... }
 *
 * // Calling the action:
 * actions.myPackage.someAction();
 * ```
 *
 * @example
 * ```typescript
 * // With parameters:
 * const someAction: Action<Packages, Arg1, Arg2> = ({
 *   state,
 *   actions,
 *   libraries
 * }) => (arg1, arg2) => { ... };
 *
 * // Calling the action:
 * actions.myPackage.someAction("arg 1", "arg 2");
 * ```
 *
 * @typeparam Packages - The definition of all the packages that a Frontity
 * package is aware of.
 * @typeparam AN - Type of argument number N of the final action.
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
  ? (store: ResolvePackages<Packages>) => void
  : (
      store: ResolvePackages<Packages>
    ) => (...args: Arguments<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>) => void;

/**
 * Type declaration of a Frontity async action.
 *
 * @example
 * ```typescript
 * // Without parameters:
 * const someAction: AsyncAction<Packages> = async ({
 *   state,
 *   actions,
 *   libraries
 * }) => { await ... }
 *
 * // Calling the action:
 * await actions.myPackage.someAction();
 * ```
 *
 * @example
 * ```typescript
 * // With parameters:
 * const someAction: AsyncAction<Packages, Arg1, Arg2> = ({
 *   state,
 *   actions,
 *   libraries
 * }) => async (arg1, arg2) => { await ... };
 *
 * // Calling the action:
 * await actions.myPackage.someAction("arg 1", "arg 2");
 * ```
 *
 * @typeparam Packages - The definition of all the packages that a Frontity
 * package is aware of.
 * @typeparam AN - Type of argument number N of the final action.
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
  ? (store: ResolvePackages<Packages>) => Promise<void>
  : (
      store: ResolvePackages<Packages>
    ) => (
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
 * Parameter for {@link ServerAction}.
 */
interface ServerActionParam {
  /**
   * Koa context.
   */
  ctx: Context;
}

/**
 * Type definition for Frontity server actions, like `beforeSSR` or `afterSSR`.
 *
 * @typeparam Packages - The definition of all the packages that a Frontity
 * package is aware of.
 */
export type ServerAction<Packages> = AsyncAction<Packages, ServerActionParam>;
