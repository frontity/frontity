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
