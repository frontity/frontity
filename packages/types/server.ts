import { Middleware, Next, ParameterizedContext } from "koa";
import { ResolveState, ResolveActions } from "./utils";
import Package from "./package";

/**
 * Frontity context for Koa middleware.
 */
export interface Context<Packages extends Package = Package>
  extends ParameterizedContext {
  /**
   * Frontity namespace for custom properties.
   */
  frontity: any;

  /**
   * Packages state.
   */
  state: ResolveState<Packages["state"]>;

  /**
   * Packages actions.
   */
  actions: ResolveActions<Packages["actions"]>;

  /**
   * Packages libraries.
   */
  libraries: Packages["libraries"];

  /**
   * Packages server middleware.
   */
  server: Packages["server"];

  /**
   * Extended Koa context.
   */
  ctx: Context<Packages>;

  /**
   * Koa Next function.
   */
  next: Next;
}

/**
 * Types for server middleware in Frontity packages.
 */
export type Server<Packages extends Package> = Middleware<
  ResolveState<Packages["state"]>,
  Context<Packages>
>;

/**
 * Types for async server middleware in Frontity packages.
 */
export type AsyncServer<Packages extends Package> = Server<Packages>;
