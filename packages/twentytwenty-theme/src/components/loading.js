import React from "react";
import { styled, connect } from "frontity";
import Loader from "react-spinners/BarLoader";

const Loading = ({ state }) => (
  <Container>
    <Loader
      color={state.theme.colors.primary}
      radius={0}
      margin="3px"
      height={4}
      width={240}
    />
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
