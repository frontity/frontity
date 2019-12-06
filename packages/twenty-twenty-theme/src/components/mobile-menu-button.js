import { connect } from "frontity";
import React from "react";
import { ToggleIcon } from "./icons";
import { LabeledIcon, NavToggle, ToggleWrapper } from "./nav-toggle";

const MobileMenuButton = ({ state, actions }) => {
  // Get Menuate of the search modal
  const { isMobileMenuOpen } = state.theme;
  const { toggleMobileMenu } = actions.theme;

  return (
    <ToggleWrapper>
      <NavToggle
        isMobile
        aria-expanded={isMobileMenuOpen}
        onClick={toggleMobileMenu}
        aria-label="Click to open search bar..."
      >
        <LabeledIcon icon={ToggleIcon} label="Menu" />
      </NavToggle>
    </ToggleWrapper>
  );
};

export default connect(MobileMenuButton);
