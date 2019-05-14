import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

const List = ({ state }) => {
  const data = state.source.data(state.router.path);

  // console.log("still trying to render a list");

  return (
    <Container>
      {data.pages[state.router.page - 1].map(itemData => {
        const item = state.source[itemData.type][itemData.id];
        return <Item key={item.id} item={item} />;
      })}
    </Container>
  );
};

const Item = ({ item }) => (
  <ItemContainer>
    <Link href={item.link}>
      <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
    </Link>
    <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
  </ItemContainer>
);

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
