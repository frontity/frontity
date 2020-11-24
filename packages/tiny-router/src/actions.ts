import { warn, error } from "frontity";
import { SetOptions } from "@frontity/router/types";
import clone from "ramda/src/clone";
import TinyRouter from "../types";
import { isError } from "@frontity/source";

/**
 * Default options for the `actions.router.set` action.
 */
const defaultSetOptions: SetOptions = {
  method: "push",
  state: {},
};

/**
 * Set the URL.
 *
 * @param link - The URL that will replace the current one. It can be a path
 * like `/category/nature/`, a path that includes the page
 * `/category/nature/page/2` or the full URL `https://site.com/category/nature`.
 *
 * @param options - An optional configuration object that can contain:
 * - `method` "push" | "replace" (default: "push").
 *
 * The method used in the action. "push" corresponds to window.history.pushState
 * and "replace" to window.history.replaceState.
 *
 * - `state` - An object that will be saved in window.history.state. This object
 *   is recovered when the user go back and forward using the browser buttons.
 *
 * @example
 * ```
 * const Link = ({ actions, children, link }) => {
 *   const onClick = (event) => {
 *     event.preventDefault();
 *     actions.router.set(link);
 *   };
 *
 *   return (
 *     <a href={link} onClick={onClick}>
 *       {children}
 *    </a>
 *   );
 * };
 * ```
 * @returns Void.
 */
export const set: TinyRouter["actions"]["router"]["set"] = ({
  state,
  actions,
  libraries,
}) => (link, options = {}): void => {
  // Normalize the link.
  if (libraries.source && libraries.source.normalize)
    link = libraries.source.normalize(link);

  // If the link hasn't changed or we are not on the client, do nothing.
  if (state.router.link !== link && state.frontity.platform === "client") {
    // Sets state default values
    options = {
      ...defaultSetOptions,
      ...options,
    };

    state.router.previous = state.router.link;
    state.router.link = link;
    state.router.state = options.state;

    // Do a fetch of the current URL.
    if (state.router.autoFetch) actions.source?.fetch(link);

    if (options.method === "push") {
      // Update history.
      window.history.pushState(clone(options.state), "", link);
    } else if (options.method === "replace") {
      // Update history.
      window.history.replaceState(clone(options.state), "", link);
    } else if (options.method !== "pop") {
      // Throw an error if another method is used. We support "pop" internally
      // for popstate events.
      error(
        `The method ${options.method} is not supported by actions.router.set.`
      );
    }
  }

  // Finally, set the `state.router.link` property to the new value.
  state.router.link = link;
  state.router.state = options.state;
};

export const updateState: TinyRouter["actions"]["router"]["updateState"] = ({
  state,
}) => (browserState: object) => {
  state.router.state = browserState;
  window.history.replaceState(clone(browserState), "");
};

export const init: TinyRouter["actions"]["router"]["init"] = ({
  state,
  actions,
  libraries,
}) => {
  if (state.frontity.platform === "server") {
    // Populate the router info with the initial path and page.
    state.router.link = libraries.source?.normalize
      ? libraries.source.normalize(state.frontity.initialLink)
      : state.frontity.initialLink;
  } else {
    // Replace the current url with the same one but with state.
    window.history.replaceState(clone(state.router.state), "");
    // Listen to changes in history.
    window.addEventListener("popstate", (event) => {
      if (event.state) {
        actions.router.set(
          location.pathname + location.search + location.hash,
          // We are casting types here because `pop` is used only internally,
          // therefore we don't want to expose it in the types for users.
          { method: "pop", state: event.state } as any
        );
      }
    });
  }
};

/**
 * Implementation of the `beforeSSR()` Frontity action as used by the
 * tiny-router.
 *
 * @param ctx - The context of the Koa application.
 *
 * @returns Void.
 */
export const beforeSSR: TinyRouter["actions"]["router"]["beforeSSR"] = ({
  state,
  actions,
}) => async ({ ctx }) => {
  if (state.router.autoFetch) {
    if (actions.source?.fetch) {
      await actions.source.fetch(state.router.link);
      const data = state.source.get(state.router.link);
      if (isError(data)) {
        ctx.status = data.errorStatus;
      }
    } else {
      warn(
        "You are trying to use autoFetch but no source package is installed."
      );
    }
  }
};
