import React, { MouseEvent } from "react";
import { warn } from "frontity";
import connect, { useConnect } from "@frontity/connect";
import { Package } from "frontity/types";

type LinkType = React.FC<{
  link: string;
  target?: "_self" | "_blank";
  className?: string;
  onClick?: () => void;
  scroll?: boolean;
  "aria-current"?: React.AriaAttributes["aria-current"];
}>;

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
