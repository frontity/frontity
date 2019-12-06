import React, { useEffect } from "react";
import { connect } from "frontity";

const Link = ({
  state,
  actions,
  link,
  className,
  children,
  rel,
  "aria-current": ariaCurrent,
  onClick: onClickProp
}) => {
  // Check if the link is an external or internal link
  const isExternal = link.startsWith("http");

  // Pre-fetch the page for this link
  useEffect(() => {
    if (!isExternal) {
      actions.source.fetch(link);
    }
  }, []);

  const onClick = event => {
    // Do nothing if it's an external link
    if (isExternal) return;

    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    window.scrollTo(0, 0);

    // if the menu modal is open, close it so it doesn't block rendering
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }

    if (onClickProp) {
      onClickProp(event);
    }
  };

  return (
    <a
      href={link}
      onClick={onClick}
      className={className}
      aria-current={ariaCurrent}
      rel={rel}
    >
      {children}
    </a>
  );
};

export default connect(Link);
