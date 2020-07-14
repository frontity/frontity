import React from "react";
import { connect, useConnect } from "frontity";
import Link from "@frontity/components/link";

/**
 * The TwentyLink component, which is a wrapper on top of the {@link Link}
 * component.
 *
 * @param props - It accepts the same props than the {@link Link} component.
 *
 * @example
 * ```js
 * <TwentyLink link="/some-post">
 *   <div>Some Post</div>
 * </TwentyLink>
 * ```
 *
 * @returns A {@link Link} component, which returns an HTML anchor element.
 */
const TwentyLink = ({ children, onClick: onClickProp, ...props }) => {
  const { state, actions } = useConnect();

  /**
   * A handler that closes the mobile menu when a link is clicked.
   *
   * @param event The event object.
   */
  const onClick = (event) => {
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }

    if (onClickProp) {
      onClickProp(event);
    }
  };

  return (
    <Link {...props} onClick={onClick}>
      {children}
    </Link>
  );
};

export default connect(TwentyLink, { injectProps: false });
