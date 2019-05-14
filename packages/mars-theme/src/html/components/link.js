import React from "react";
import { connect } from "frontity";

const Link = ({ actions, children, href, className }) => {
  const onClick = event => {
    event.preventDefault();
    actions.source.fetch(href);
    actions.router.set(href);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
