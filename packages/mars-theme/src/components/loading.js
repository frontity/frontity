import React from "react";
import { styled } from "frontity";
import Spinner from "./spinner";

const Loading = () => (
  <Container>
    <Spinner/>
  </Container>
);

export default Loading;

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 24px;
  }
`;
