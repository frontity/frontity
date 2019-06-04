import React from "react";
import { connect } from "frontity";

const Link = ({
  actions,
  libraries,
  path,
  page,
  query,
  className,
  children
}) => {
  // If page is passed, build final href.
  // const href = page ? `${path}page/${page}` : path;
  const href = libraries.source.getRoute({ path, page, query });

  const onClick = event => {
    event.preventDefault();
    // Set the router to the new url.
    actions.router.set({ path, page, query });
    window.scrollTo(0, 0);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
