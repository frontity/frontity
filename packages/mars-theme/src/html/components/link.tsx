import React from "react";
import connect from "@frontity/connect";
import { Connect } from "frontity/types";
import MarsTheme from "../../..";

const Link: React.FC<
  Connect<MarsTheme, { href: string; className?: string }>
> = ({ actions, children, href, className }) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
