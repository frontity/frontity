import React, { MouseEvent } from "react";
import { connect, useConnect } from "frontity";
import { Package } from "frontity/types";

type LinkType = React.FC<{
  link: string;
  target?: "_self" | "_blank";
  className?: string;
  onClick?: () => void;
  scroll?: boolean;
}>;

const Link: LinkType = ({
  link,
  children,
  onClick,
  target = "_self",
  className = "",
  scroll = true,
}) => {
  const { actions } = useConnect<Package>();

  const onClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    // Do nothing if it's an external link
    if (link.startsWith("http")) return;

    // Do nothing if this is supposed to open in a new tab
    if (target === "_blank") return;

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
      className={className}
    >
      {children}
    </a>
  );
};

export default connect(Link);
