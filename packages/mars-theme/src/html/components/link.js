import React from "react";
import { connect, styled } from "frontity";

const A = styled.a`
  color: rgb(31, 56, 197);
  text-decoration: underline;
`;

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
