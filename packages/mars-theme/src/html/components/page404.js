import React from "react";
import { styled } from "frontity";

const Page404 = () => (
  <Container>
    <Title>Oops! 404</Title>
    <Description>
      That page can’t be found{" "}
      <span role="img" aria-label="confused face">
        😕
      </span>
    </Description>
  </Container>
);

export default Page404;

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
  font-size: 4em;
`;

const Description = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
  margin: 24px 0;
`;
