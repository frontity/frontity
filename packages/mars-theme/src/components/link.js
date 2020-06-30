import React from "react";
import { connect, useConnect } from "frontity";
import Link from "@frontity/components/link";

/**
 * The Link component.
 *
 * @param chldren React children.
 *
 * @example
 * ```js
 *   <MarsLink link="/posts" />
 * ```
 *
 * @returns React `<a/>` element.
 */
const MarsLink = ({ children, ...props }) => {
  const { state, actions } = useConnect();

  //eslint-disable-next-line jsdoc/require-jsdoc
  const onClick = () => {
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }
  };

  return (
    <Link {...props} onClick={onClick}>
      {children}
    </Link>
  );
};

export default connect(MarsLink, { injectProps: false });
