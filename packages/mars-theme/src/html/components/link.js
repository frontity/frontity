import React from "react";
import { connect } from "frontity";

const Link = ({ actions, children, path, className, page }) => {
  // If page is passed, build final href.
  const href = page ? `${path}page/${page}` : path;

  const onClick = event => {
    event.preventDefault();
    // Fetch the data if it's not already fetched.
    actions.source.fetch({ path, page });
    // Set the router to the new url.
    actions.router.set({ path, page });
    window.scrollTo(0, 0);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
