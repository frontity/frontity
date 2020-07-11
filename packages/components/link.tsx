import React, { MouseEvent, useEffect, useRef } from "react";
import { warn, connect, useConnect } from "frontity";
import { Package } from "frontity/types";

let cachedObserver: IntersectionObserver;
const IntersectionObserver =
  typeof window !== "undefined" ? window.IntersectionObserver : null;
const listeners = new Map<Element, () => void>();

/**
 * Returns a shared instance of a IntersectionObserver.
 */
function getObserver(): IntersectionObserver | undefined {
  if (cachedObserver) {
    return cachedObserver;
  }

  if (!IntersectionObserver) {
    return undefined;
  }

  cachedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!listeners.has(entry.target)) {
          return;
        }

        const cb = listeners.get(entry.target);
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          cachedObserver.unobserve(entry.target);
          listeners.delete(entry.target);
          cb();
        }
      });
    },
    { rootMargin: "200px" }
  );

  return cachedObserver;
}

/**
 * Watches intersections.
 *
 * @param el The element to watch for intersections.
 * @param cb The callback that should run should an intersection happen.
 */
function watch(el: Element, cb: () => void) {
  const observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);

  return () => {
    try {
      observer.unobserve(el);
    } catch (exception) {
      console.error(exception);
    }
    listeners.delete(el);
  };
}

/**
 * Executes the callback when the hover event is triggered for the element.
 *
 * @param el The element to watch for hover events.
 * @param cb The callback that should run should an hover event happen.
 */
function onHover(el: HTMLAnchorElement, cb: () => void) {
  el.addEventListener("mouseover", cb);

  return () => {
    el.removeEventListener("mouseover", cb);
  };
}

/**
 * Props for React component {@link Link}.
 */
interface LinkProps {
  /**
   * The URL to link to.
   */
  link: string;

  /**
   * The target of the anchor:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target.
   *
   * @defaultValue "_self"
   */
  target?: "_self" | "_blank";

  /**
   * The onClick handler. Can be used to pass an optional callback that will be
   * invoked on click.
   */
  onClick?: () => void;

  /**
   * Whether the browser should scroll up to the top upon navigating to a new
   * page.
   *
   * @defaultValue true
   */
  scroll?: boolean;

  /**
   * Whether frontity should automatically prefetch this link or not.
   * The prefetching mode is controlled through state.theme.prefetch.
   *
   * @defaultValue true
   */
  prefetch?: boolean;

  /**
   * Indicates the element that represents the current item within a container
   * or set of related elements:
   * https://www.w3.org/TR/wai-aria-1.1/#aria-current.
   */
  "aria-current"?: React.AriaAttributes["aria-current"];

  /**
   * Represents any other prop that can be passed to Link.
   * These props are passed down to the `<a/>` element.
   */
  [key: string]: any;
}

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
  link,
  children,
  onClick,
  target = "_self",
  scroll = true,
  prefetch = true,
  "aria-current": ariaCurrent,
  ...anchorProps
}) => {
  const { state, actions } = useConnect<Package>();
  const ref = useRef(null);

  const autoPrefetch = state?.theme?.autoPrefetch;

  if (!link || typeof link !== "string") {
    warn("link prop is required and must be a string");
  }

  useEffect(() => {
    // Checks if user is on slow connection or has enabled data saver
    const _navigator = navigator as Navigator & { connection };
    const isSlowConnection =
      _navigator?.connection?.saveData ||
      (_navigator?.connection?.effectiveType || "").includes("2g");

    if (
      !prefetch ||
      !link ||
      !window.IntersectionObserver ||
      isSlowConnection
    ) {
      return;
    }

    /**
     * Prefetches the link only if necessary
     *
     * @param link The link to prefetch
     */
    const maybePrefetch = (link: string) => {
      const data = state.source.get(link);

      if (!data.isReady && !data.isFetching) {
        actions.source.fetch(link);
      }
    };

    if (autoPrefetch === "all") {
      maybePrefetch(link);
    } else if (ref.current && autoPrefetch === "hover") {
      return onHover(ref.current, () => {
        maybePrefetch(link);
      });
    } else if (ref.current && autoPrefetch === "in-view") {
      return watch(ref.current, () => {
        maybePrefetch(link);
      });
    }
  }, [prefetch, link, ref, autoPrefetch]);

  /**
   * The event handler for the click event. It will try to do client-side
   * rendering but bail out in certain situations, like when the link is
   * external or the user is trying to open a new tab.
   *
   * @param event - The mouse click event.
   */
  const onClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    // Do nothing if it's an external link
    if (link.startsWith("http")) return;

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
      onClick();
    }
  };

  return (
    <a
      href={link}
      target={target}
      onClick={onClickHandler}
      aria-current={ariaCurrent}
      {...anchorProps}
      ref={ref}
    >
      {children}
    </a>
  );
};

export default connect(Link, { injectProps: false });
