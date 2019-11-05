import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import { CloseIcon, HamburgerIcon } from "./menu-icon";

const Header = ({ state, actions }) => {
  const isMenuOpen = state.theme.menu.isOpen;
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <Description>{state.frontity.description}</Description>
        <StyledButton onClick={() => actions.theme.menu.toggle()}>
          {isMenuOpen ? (
            <CloseIcon color="white" size="24px" />
          ) : (
            <HamburgerIcon color="white" size="24px" />
          )}
        </StyledButton>
      </Container>
      <Nav />
    </>
  );
};

export default connect(Header);

const StyledButton = styled.button`
  position: absolute;
  right: 24px;
  background: transparent;
  border: 0;
  color: white;
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
