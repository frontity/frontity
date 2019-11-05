import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";
import { useMediaQuery } from "./use-media-query";

const Header = ({ state, actions }) => {
  // Get the menu opened state
  const { isMenuOpen } = state.theme;

  // Check if the viewport is less than 560px (mobile)
  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <Description>{state.frontity.description}</Description>

        {/* If we're on mobile viewport, show a menu toggle to activate the modal */}
        {isMobile && (
          <MenuToggle onClick={() => actions.theme.toggleMenu()}>
            {isMenuOpen ? (
              <CloseIcon color="white" size="20px" />
            ) : (
              <HamburgerIcon color="white" size="24px" />
            )}
          </MenuToggle>
        )}

        {/* If the menu is open, render the menu modal */}
        {isMenuOpen && <MenuModal />}
      </Container>
      {!isMobile && <Nav />}
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const MenuToggle = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  background: transparent;
  border: 0;
  color: white;
  z-index: 5;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
