import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

const Header = ({ state }) => {
  return (
    <Container>
      <StyledLink href="/">
        <Title>{state.frontity.title}</Title>
      </StyledLink>
      <Description>{state.frontity.description}</Description>
    </Container>
  );
};

export default connect(Header);

const Container = styled.div`
  width: 840px;
  height: 80px;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
