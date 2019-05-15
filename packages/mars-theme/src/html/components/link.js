import React from "react";
import { connect } from "frontity";

const Link = ({ actions, children, href, className }) => {
  const onClick = event => {
    event.preventDefault();
    // Fetch the data if it's not already fetched.
    actions.source.fetch(href);
    // Set the router to the new url.
    actions.router.set(href);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
