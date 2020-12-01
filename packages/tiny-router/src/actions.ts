import TinyRouter from "../types";
import { warn, observe } from "frontity";
import { isError, isRedirection } from "@frontity/source";

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

  // Set state default value.
  if (!options.state) options.state = {};

  // If the data is a redirection, then we set the link to the location.
  // The redirections are stored in source.data just like any other data.
  const data = state.source?.get(link);
  if (data && isRedirection(data)) {
    link = data.location;
  }

  // Trigger the fetch if `autoFetch` is true and update the window.history
  // object.
  if (
    options.method === "push" ||
    (!options.method && state.frontity.platform === "client")
  ) {
    window.history.pushState(options.state, "", link);
    if (state.router.autoFetch) actions.source?.fetch(link);
  } else if (options.method === "replace") {
    window.history.replaceState(options.state, "", link);
    if (state.router.autoFetch) actions.source?.fetch(link);
  }

  // Finally, set the `state.router.link` property to the new value.
  state.router.link = link;
  state.router.state = options.state;
};

/**
 * Implementation of the `init()` Frontity action as used by the tiny-router.
 *
 * @param params - The params passed to every action in frontity: `state`,
 * `actions`, `library`.
 */
export const init: TinyRouter["actions"]["router"]["init"] = ({
  state,
  actions,
  libraries,
}) => {
  if (state.frontity.platform === "server") {
    // Populate the router info with the initial path and page.
    state.router.link =
      libraries.source && libraries.source.normalize
        ? libraries.source.normalize(state.frontity.initialLink)
        : state.frontity.initialLink;
  } else {
    // Observe the current data object. If it is ever a redirection, replace the
    // current link with the new one.
    observe(() => {
      const data = state.source?.get(state.router.link);
      if (data && isRedirection(data)) {
        actions.router.set(data.location, {
          // Use "replace" to keep browser history consistent.
          method: "replace",
          // Keep the same history.state that the old link had.
          state: state.router.state,
        });
      }
    });

    // Replace the current url with the same one but with state.
    window.history.replaceState(
      { ...state.router.state },
      "",
      state.router.link
    );
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
  // If autoFetch is disabled, there is nothing to do.
  if (!state.router.autoFetch) {
    return;
  }

  // Because Frontity is a modular framework, it could happen that a source
  // package like `@frontity/wp-source` has not been installed but the user is
  // trying to use autoFetch option, which requires it.
  if (!actions.source || !actions.source.fetch || !state.source.get) {
    warn("You are trying to use autoFetch but no source package is installed.");
    return;
  }

  await actions.source.fetch(state.router.link);
  const data = state.source.get(state.router.link);

  // Check if the link has a redirection.
  if (data && isRedirection(data)) {
    // Recover all the missing query params from the original URL. This is
    // required because we remove the query params that start with `frontity_`.
    const location = new URL(data.location, "https://dummy-domain.com");
    ctx.URL.searchParams.forEach((value, key) => {
      if (!location.searchParams.has(key))
        location.searchParams.append(key, value);
    });

    // Set the correct status for the redirection.
    // It could be a 301, 302, 307 or 308.
    ctx.status = data.redirectionStatus;

    // Do the redirection.
    ctx.redirect(location.pathname + location.search + location.hash);
  } else if (isError(data)) {
    // If there was an error, return the proper status.
    const data = state.source.get(state.router.link);
    if (isError(data)) {
      ctx.status = data.errorStatus;
    }
  }
};
