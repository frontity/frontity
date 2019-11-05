import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";

const Header = ({ state, actions }) => {
  const { isMenuOpen } = state.theme;
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <Description>{state.frontity.description}</Description>

        {/* Show a menu toggle to activate the modal */}
        <MenuToggle onClick={() => actions.theme.toggleMenu()}>
          {isMenuOpen ? (
            <CloseIcon color="white" size="24px" />
          ) : (
            <HamburgerIcon color="white" size="24px" />
          )}
        </MenuToggle>

        {/* If the menu is open, render the menu modal */}
        {isMenuOpen && <MenuModal />}
      </Container>
      <Nav />
    </>
  );
};

export default connect(Header);

const MenuToggle = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  background: transparent;
  border: 0;
  color: white;
  z-index: 5;
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
