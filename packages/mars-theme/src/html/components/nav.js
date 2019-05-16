import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

const Nav = ({ state }) => (
  <Container>
    {state.theme.menu.map(item => (
      <Item key={item[0]} isSelected={state.router.path === item[1]}>
        <Link path={item[1]}>{item[0]}</Link>
      </Item>
    ))}
  </Container>
);

export default connect(Nav);

const Container = styled.ul`
  list-style: none;
  display: flex;
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0;
  overflow-x: scroll;
`;

const Item = styled.li`
  padding: 0;
  margin: 0 16px;
  color: #fff;
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;

  & > a {
    display: inline-block;
    line-height: 2em;
    border-bottom: 2px solid
      ${({ isSelected }) => (isSelected ? "#fff" : "transparent")};
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;
