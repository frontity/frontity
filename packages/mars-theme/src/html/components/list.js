import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

const List = ({ state }) => {
  const data = state.source.data(state.router.path);

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
  width: 840px;
  margin: 0;
  padding: 24px;
  list-style: none;
`;

const ItemContainer = styled.li`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: rgba(12, 17, 43);
  margin: 0;
  margin-top: 24px;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
