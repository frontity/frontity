import React from "react";
import connect from "@frontity/connect";
import { Connect } from "frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";
import Link from "./link";

const List: React.FC<Connect<MarsTheme>> = ({ state }) => {
  const { type }: { type?: string } =
    state.source.data(state.router.path) || {};
  return (
    <Container>
      {Object.values(type ? state.source[type] : {}).map(item => (
        <Item key={item.id} item={item} />
      ))}
    </Container>
  );
};

const Item: React.FC<
  Connect<
    MarsTheme,
    {
      item: { id: number; title: string; excerpt: string };
    }
  >
> = connect(({ item }) => (
  <ItemContainer>
    <Link href={item.link}>
      <Title>{item.title.rendered}</Title>
    </Link>
    <Excerpt>{item.excerpt.rendered}</Excerpt>
  </ItemContainer>
));

export default connect(List);

const Container = styled.ul`
  width: 800px;
  margin: 0;
  list-style: none;
  padding: 24px;
`;

const ItemContainer = styled.li`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
  color: #451804;
`;

const Excerpt = styled.p`
  margin: 0;
`;
