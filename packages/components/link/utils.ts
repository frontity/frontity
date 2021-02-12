import { NavigatorWithConnection } from "./types";

/**
 * Configuration for the prefetcher behaviour.
 */
export const config = {
  /**
   * The number of miliseconds to wait until the hover triggers the prefetch.
   *
   * We can avoid prefetching when the mouse is moving quickly through a menu,
   * without pausing in a specific link.
   */
  hoverDelay: 50,

  /**
   * The number of requests per batch.
   *
   * We can avoid doing too many requests at the same time.
   */
  requestsPerBatch: 4,

  /**
   * Interval of time to wait between processing each batch.
   */
  batchInterval: 1000,
};

/**
 * Controls the processing queue of the links.
 */
export class Queue {
  /**
   * Indicates whether the queue is processing or not.
   */
  isProcessing = false;

  /**
   * A `Set` to store the links that need to be prefetched.
   */
  toPrefetch = new Set<string>();

  /**
   * Process the queue of links to prefetch.
   *
   * @param prefetcher - The function used to prefetch the link.
   */
  process(prefetcher: (link: string) => void) {
    let batchInterval: ReturnType<typeof setInterval> = null;

    /**
     * Process a batch of prefetches.
     */
    const process = () => {
      const batch = Array.from(this.toPrefetch).slice(
        0,
        config.requestsPerBatch
      );

      // if batch is empty, stop process and allow it to run again if necessary.
      if (batch.length === 0) {
        this.isProcessing = false;
        clearTimeout(batchInterval);
        return;
      }

      batch.forEach((link) => {
        prefetcher(link);
        this.toPrefetch.delete(link);
      });
    };

    batchInterval = setInterval(() => {
      process();
    }, config.batchInterval);
  }
}

/**
 * Executes the callback when the hover event is triggered for the element.
 *
 * @param el - The element to watch for hover events.
 * @param cb - The callback that should run should an hover event happen.
 *
 * @returns A callback that removes the event listeners.
 */
export const onHover = (el: HTMLAnchorElement, cb: () => void) => {
  let timeout: ReturnType<typeof setTimeout> = null;

  /**
   * When the mouse is moved over the element, it delays the call of the
   * callback for a number of miliseconds, as configured in
   * `config.hoverDelay`.
   */
  const mouseOverHandler = () => {
    timeout = setTimeout(() => {
      cb();
    }, config.hoverDelay);
  };

  /**
   * Removes the timeout to avoid executing the callback if the cursor is
   * moved out of the element before `config.hoverDelay`.
   */
  const mouseOutHandler = () => {
    clearTimeout(timeout);
  };

  el.addEventListener("mouseover", mouseOverHandler);
  el.addEventListener("mouseout", mouseOutHandler);

  return () => {
    el.removeEventListener("mouseover", mouseOverHandler);
    el.removeEventListener("mouseout", mouseOutHandler);
  };
};

/**
 * Make the link relative if it belongs to the backend, to force client-side
 * navigation.
 *
 * @param link - The link URL.
 * @param sourceUrl - The Source URL. It usually comes from `state.source.url`.
 * @param match - (Optional) array of RegExp that matches the URL.
 *
 * @returns The URL without the Source URL.
 */
export const removeSourceUrl = (
  link: string,
  sourceUrl: string,
  match?: string[]
) => {
  // if match is present we need to ensure the internal link matches the current site url pattern
  if (match && !match.some((regexp) => new RegExp(regexp).test(link))) {
    return link;
  }

  const linkUrl = new URL(link, sourceUrl);
  return linkUrl.hostname === new URL(sourceUrl).hostname
    ? linkUrl.pathname + linkUrl.search + linkUrl.hash
    : link;
};

/**
 * Checks if the provided link is an external Url.
 *
 * @param link - The link Url.
 *
 * @returns True if the link is an external Url.
 */
export const isExternalUrl = (link: string) => {
  try {
    new URL(link);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Checks whether the provided link should be fetched by the Link component.
 *
 * @param link - The link URL.
 *
 * @returns True if link should be fetched.
 */
export const shouldFetchLink = (link: string) => {
  /**
   * Checks if user is on slow connection or has enabled data saver.
   */
  const _navigator = window.navigator as NavigatorWithConnection;

  const isSlowConnection =
    _navigator?.connection?.saveData ||
    (_navigator?.connection?.effectiveType || "").includes("2g");

  return !isSlowConnection && !isExternalUrl(link);
};
