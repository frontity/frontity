import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";

/**
 * Header Component
 *
 * It renders the title, description and navigation links.
 */
const Header = ({ state }) => (
  <>
    <Container>
      {/* Wrapping Title in a Link to make it clickable.
      It goes to home page when clicked*/}
      <StyledLink link="/">
        <Title>{state.frontity.title}</Title>
      </StyledLink>
      <Description>{state.frontity.description}</Description>
    </Container>
    <Nav />
  </>
);

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

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
