import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

const Header = () => {
  return (
    <Container>
      <StyledLink href="/">
        <Title>This is a site title.</Title>
      </StyledLink>
      <Description>This is a site description.</Description>
    </Container>
  );
};

export default connect(Header);

const Container = styled.div`
  width: 800px;
  height: 80px;
  padding: 24px;
  color: #f0e7e7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
