import TinyRouter from "../types";
import { warn, observe, batch } from "frontity";
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

  // Clone the state that we are going to use for `window.history` because it
  // cannot contain proxies.
  const historyState = JSON.parse(JSON.stringify(options.state || {}));

  // If the data is a redirection, then we set the link to the location.
  // The redirections are stored in source.data just like any other data.
  const data = state.source?.get(link);
  if (data && data.isReady && isRedirection(data)) {
    if (data.isExternal) {
      window.replaceLocation(data.location);
    } else {
      // If the link is internal, we have to discard the domain.
      const { pathname, hash, search } = new URL(
        data.location,
        "https://dummy-domain.com"
      );
      // If there is a link normalize, we have to use it.
      if (libraries.source && libraries.source.normalize)
        link = libraries.source.normalize(pathname + hash + search);
      else link = pathname + hash + search;
    }
  }

  // If we are in the client, update `window.history` and fetch the link.
  if (state.frontity.platform === "client") {
    if (!options.method || options.method === "push")
      window.history.pushState(historyState, "", link);
    else if (options.method === "replace")
      window.history.replaceState(historyState, "", link);

    // If `autoFetch` is on, do the fetch.
    if (state.router.autoFetch) actions.source?.fetch(link);
  }

  // Finally, set the `state.router.link` property to the new value.
  batch(() => {
    state.router.link = link;
    state.router.state = historyState;
  });
};

/**
 * Initilization of the router.
 *
 * @param store - The Frontity store.
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
    // Wrap `window.replace.location` so we can mock it in the e2e tests.
    // This is required because `window.location` is protected by the browser
    // and can't be modified.
    window.replaceLocation = window.replaceLocation || window.location.replace;

    // Observe the current data object. If it is ever a redirection, replace the
    // current link with the new one.
    observe(() => {
      const data = state.source?.get(state.router.link);
      if (data && isRedirection(data)) {
        // If the redirection is external, redirect to the full URL.
        if (data.isExternal) {
          window.replaceLocation(data.location);
        } else {
          // If the redirection is internal, use actions.router.set to switch
          // to the new redirection.
          actions.router.set(data.location, {
            // Use "replace" to keep browser history consistent.
            method: "replace",
            // Keep the same history.state that the old link had. We have to
            // stringfy and parse the object because window.history.replaceState()
            // does not accept a Proxy.
            state: state.router.state,
          });
        }
      }
    });

    // The link stored in `state.router.link` may be wrong if the server changes
    // it in some cases (see https://github.com/frontity/frontity/issues/623).
    // For that reason, it is replaced with the current link in the browser.

    // Get the browser URL and remove the Frontity options.
    const browserURL = new URL(location.href);
    Array.from(browserURL.searchParams.keys()).forEach((key) => {
      if (key.startsWith("frontity_")) browserURL.searchParams.delete(key);
    });

    // Normalize it.
    let link = browserURL.pathname + browserURL.search + browserURL.hash;
    if (libraries.source?.normalize) link = libraries.source.normalize(link);

    // Add the state to the browser history and replace the link.
    window.history.replaceState(
      JSON.parse(JSON.stringify(state.router.state)),
      "",
      link
    );

    // If the link from the browser and the link from the server are different,
    // point the first one to the same data object pointed by the second one.
    if (link !== state.frontity.initialLink) {
      if (state.source) {
        state.source.data[link] = state.source.get(state.frontity.initialLink);
      }

      // Update the value of `state.router.link`.
      state.router.link = link;
    }

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

  // Fetch the current link.
  await actions.source.fetch(state.router.link);
  const data = state.source.get(state.router.link);

  // Check if the link has a redirection.
  if (data && isRedirection(data)) {
    // If the redirection is external, just redirect to the full URL here.
    if (data.isExternal) {
      ctx.status = data.redirectionStatus;
      ctx.redirect(data.location);
      return;
    }

    // Recover all the missing query params from the original URL. This is
    // required because we remove the query params that start with `frontity_`.
    const location = new URL(data.location, "https://dummy-domain.com");
    ctx.URL.searchParams.forEach((value, key) => {
      if (!location.searchParams.has(key))
        location.searchParams.append(key, value);
    });

    // Set the correct status for the redirection. It could be a 301, 302, 307
    // or 308.
    ctx.status = data.redirectionStatus;

    // 30X redirections need the be absolute, so we add the Frontity URL.
    const redirectionURL =
      state.frontity.url.replace(/\/$/, "") +
      location.pathname +
      location.hash +
      location.search;

    ctx.redirect(redirectionURL);
    return;
  }

  if (isError(data)) {
    // If there was an error, return the proper status.
    ctx.status = data.errorStatus;
    return;
  }
};
