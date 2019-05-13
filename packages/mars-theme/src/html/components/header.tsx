import React from "react";
import connect from "@frontity/connect";
import { Connect } from "frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";
import Link from "./link";

const Header: React.FC<Connect<MarsTheme>> = ({ state }) => {
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
