import React from "react";
import { connect } from "frontity";

const Link = ({ actions, libraries, link, className, children }) => {
  // normalizes link
  link = libraries.source.stringify(link);

  const onClick = event => {
    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);
    window.scrollTo(0, 0);
  };

  return (
    <a href={link} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
