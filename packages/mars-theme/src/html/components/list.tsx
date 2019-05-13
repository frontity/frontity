import React, { useEffect } from "react";
import connect from "@frontity/connect";
import { Connect } from "@frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";
import Link from "./link";

const List: React.FC<Connect<MarsTheme>> = ({ state, actions }) => {
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

  // useEffect(() => {
  //   const fetch = async () => {
  //     await actions.source.fetch("/");
  //     console.log("data:", state.source.data);
  //   };

  //   fetch();
  // }, []);

  return (
    <Container>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </Container>
  );
};

const Item: React.FC<
  Connect<
    MarsTheme,
    {
      key: number;
      item: { id: number; title: string; excerpt: string };
    }
  >
> = connect(({ actions, item }) => (
  <ItemContainer>
    <Link href="/something">
      <Title>{item.title}</Title>
    </Link>
    <Excerpt>{item.excerpt}</Excerpt>
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
