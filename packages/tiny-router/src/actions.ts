import TinyRouter from "../types";
import { warn, fetch, observe } from "frontity";
import { RedirectionData } from "@frontity/source/types/data";

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
  // Normalizes link.
  if (libraries.source && libraries.source.normalize)
    link = libraries.source.normalize(link);

  // Sets state default value.
  if (!options.state) options.state = {};

  const data = state.source.get(link) as RedirectionData;
  if (data.isRedirection) {
    link = data.location;
  }

  state.router.link = link;
  state.router.state = options.state;

  if (
    options.method === "push" ||
    (!options.method && state.frontity.platform === "client")
  ) {
    window.history.pushState(options.state, "", link);
    if (state.router.autoFetch)
      actions.source?.fetch(link, { _setLinkAfterRedirect: true });
  } else if (options.method === "replace") {
    window.history.replaceState(options.state, "", link);
    if (state.router.autoFetch)
      actions.source?.fetch(link, { _setLinkAfterRedirect: true });
  }
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
  if (state.router.autoFetch) {
    if (actions.source && actions.source.fetch) {
      await actions.source.fetch(state.router.link);
      const data = state.source.get(state.router.link);
      if (data.isError) {
        ctx.status = data.errorStatus;
        if (state.router.redirections === "error") {
          const head = await fetch(
            "http://localhost:8080" + state.router.link,
            {
              method: "HEAD",
            }
          );
          if (head.redirected) {
            const newLink = new URL(head.url).pathname;

            // cause by default it's a 302
            ctx.status = 301;

            // TODO: Handle the Frontity Options
            ctx.redirect(
              newLink + "?" + `frontity_name=` + state.frontity.options.name
            );
          }
        }
      }
    } else {
      warn(
        "You are trying to use autoFetch but no source package is installed."
      );
    }
  }
};
