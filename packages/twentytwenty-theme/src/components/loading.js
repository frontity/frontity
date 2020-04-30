import React from "react";
import { styled, connect } from "frontity";
import Spinner from "./spinner";

const Loading = ({ state }) => (
  <Container>
    <Spinner />
  </Container>
);

export default connect(Loading);

const Container = styled.div`
  width: 100%;
  height: 80vh;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 24px;
  }
`;
