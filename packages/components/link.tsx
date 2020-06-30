import React, { MouseEvent } from "react";
import { warn } from "frontity";
import connect, { useConnect } from "@frontity/connect";
import { Package } from "frontity/types";

/**
 * The Link component that enables linking to internal pages in a frontity app.
 *
 * Under the hood, this component uses the `actions.router.set(link)` method
 * from \@frontity/tiny-router and creates an `<a/>` tag.
 *
 * All "unknown" props passed to the Link are passed down to an anchor `</a>` tag.
 *
 * @example
 * ```js
 *   <Link link="/posts" />
 * ```
 */
type LinkType = React.FC<{
  /**
   * The URL to link to.
   */
  link: string;

  /**
   * The target of the anchor: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target.
   */
  target?: "_self" | "_blank";

  /**
   * The onClick handler. Can be used to pass an optional callback that will be invoked on click.
   */
  onClick?: () => void;

  /**
   * Whether the browser should scroll up to the top upon navigating to a new page.
   *
   * @defaultValue true
   */
  scroll?: boolean;

  /**
   * Indicates the element that represents the current item within a container or set of related elements.
   * Https://www.w3.org/TR/wai-aria-1.1/#aria-current.
   */
  "aria-current"?: React.AriaAttributes["aria-current"];
}>;

// eslint-disable-next-line jsdoc/require-jsdoc
const Link: LinkType = ({
  link,
  children,
  onClick,
  target = "_self",
  scroll = true,
  "aria-current": ariaCurrent,
  ...anchorProps
}) => {
  const { actions } = useConnect<Package>();

  if (!link || typeof link !== "string") {
    warn("link prop is required and must be a string");
  }

  //eslint-disable-next-line jsdoc/require-jsdoc
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

    event.preventDefault();

    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    if (scroll) {
      window.scrollTo(0, 0);
      document.body.focus();
    }

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
    >
      {children}
    </a>
  );
};

export default connect(Link, { injectProps: false });
