import React, { MouseEvent, useEffect, useRef, useCallback } from "react";
import { warn, connect, useConnect } from "frontity";
import useInView from "@frontity/hooks/use-in-view";
import { Queue, onHover, removeSourceUrl } from "./utils";
import { Packages, LinkProps, NavigatorWithConnection } from "./types";

const queue = new Queue();

/**
 * The Link component that enables linking to internal pages in a frontity app.
 *
 * Under the hood, this component uses the `actions.router.set(link)` method
 * from `@frontity/tiny-router` and creates an `<a/>` tag.
 *
 * All "unknown" props passed to the Link are passed down to an anchor `</a>`
 * tag.
 *
 * @example
 * ```js
 * <Link link="/some-post">
 *   <div>Some Post</div>
 * </Link>
 * ```
 *
 * @param props - Defined by {@link LinkProps}.
 *
 * @returns An HTML anchor element.
 */
const Link: React.FC<LinkProps> = ({
  link: rawLink,
  children,
  onClick,
  target = "_self",
  scroll = true,
  prefetch = true,
  replaceSourceUrls = true,
  "aria-current": ariaCurrent,
  ...anchorProps
}) => {
  const { state, actions } = useConnect<Packages>();
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });
  const ref = useRef(null);

  // we need to handle multiple refs, one for useInView and one for tracking the hover events.
  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      if (typeof inViewRef === "function") {
        inViewRef(node);
      }
    },
    [inViewRef]
  );

  if (!rawLink || typeof rawLink !== "string") {
    warn("link prop is required and must be a string");
  }

  const link = replaceSourceUrls
    ? removeSourceUrl(rawLink, state.source.url)
    : rawLink;

  const autoPrefetch = state.theme?.autoPrefetch;
  const isExternal = link.startsWith("http");

  useEffect(() => {
    /**
     * Checks if user is on slow connection or has enabled data saver.
     */
    const _navigator = window.navigator as NavigatorWithConnection;

    const isSlowConnection =
      _navigator?.connection?.saveData ||
      (_navigator?.connection?.effectiveType || "").includes("2g");

    if (!prefetch || !link || isSlowConnection || isExternal) {
      return;
    }

    /**
     * Prefetches the link only if necessary.
     *
     * @param link - The link to prefetch.
     * @param runNow - Whether the prefetch should be executed immediately.
     */
    const maybePrefetch = (link: string, runNow = false) => {
      if (queue.toPrefetch.has(link)) {
        return;
      }

      const data = state.source.get(link);

      if (data.isReady || data.isFetching) {
        return;
      }

      // when prefetch mode is "hover" we want to prefetch without batching.
      if (runNow) {
        actions.source.fetch(link);
      } else {
        queue.toPrefetch.add(link);
      }

      // if the queue is still running this link will be picked up automatically.
      if (!queue.isProcessing) {
        queue.process(actions.source.fetch);
        queue.isProcessing = true;
      }
    };

    if (autoPrefetch === "all") {
      maybePrefetch(link);
    } else if (ref.current && autoPrefetch === "hover") {
      return onHover(ref.current, () => {
        maybePrefetch(link, true);
      });
    } else if (inView && autoPrefetch === "in-view") {
      maybePrefetch(link);
    }
  }, [
    prefetch,
    link,
    ref,
    inView,
    autoPrefetch,
    actions.source,
    isExternal,
    state.source,
  ]);

  /**
   * The event handler for the click event. It will try to do client-side
   * rendering but bail out in certain situations, like when the link is
   * external or the user is trying to open a new tab.
   *
   * @param event - The mouse click event.
   */
  const onClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    // Do nothing if it's an external link
    if (isExternal) return;

    // Do nothing if this is supposed to open in a new tab
    if (target === "_blank") return;

    // Allow the user to open the link in a new tab
    if (
      event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      (event.button && event.button === 1)
    ) {
      return;
    }

    // Prevent the server-side rendering.
    event.preventDefault();

    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    if (scroll) {
      window.scrollTo(0, 0);
      document.body.focus();
    }

    // If there's an additional handler, execute it.
    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <a
      href={link}
      target={target}
      onClick={onClickHandler}
      aria-current={ariaCurrent}
      {...anchorProps}
      ref={setRefs}
    >
      {children}
    </a>
  );
};

export default connect(Link, { injectProps: false });
