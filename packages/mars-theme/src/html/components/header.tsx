import React from "react";
import connect from "@frontity/connect";
import Connect from "@frontity/types/connect";
import MarsTheme from "../../../type";
import styled from "@emotion/styled";

const Header: React.FC<Connect<MarsTheme>> = () => {
  return (
    <Container>
      <Title>This is a site title.</Title>
      <Description>This is a site description.</Description>
    </Container>
  );
};

export default connect(Header);

const Container = styled.div`
  width: 100%;
  height: 120px;
  background: steelblue;
  color: white;
  padding: 24px 72px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h2`
  width: 800px;
  margin: 0;
`;

const Description = styled.p`
  width: 800px;
  margin: 0;
`;
