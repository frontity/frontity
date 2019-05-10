import React from "react";
import connect from "@frontity/connect";
import Connect from "@frontity/types/connect";
import MarsTheme from "../../../type";
import styled from "@emotion/styled";

const List: React.FC<Connect<MarsTheme>> = () => {
  const items = [
    {
      id: 1,
      title: "Post number one",
      excerpt: "This is a excerpt for post number one..."
    },
    {
      id: 2,
      title: "Post number two",
      excerpt: "This is a excerpt for post number two..."
    },
    {
      id: 3,
      title: "Post number three",
      excerpt: "This is a excerpt for post number three..."
    }
  ];

  return (
    <Container>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </Container>
  );
};

const Item: React.FC<{
  item: { id: number; title: string; excerpt: string };
}> = ({ item }) => (
  <ItemContainer>
    <Title>{item.title}</Title>
    <Excerpt>{item.excerpt}</Excerpt>
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
