import React from "react";
import connect from "@frontity/connect";
import { Connect } from "frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";
import Link from "./link";

const List: React.FC<Connect<MarsTheme>> = ({ state }) => {
  // There is a problem with the types here.
  const data: any = state.source.data(state.router.path);

  console.log("still trying to render a list");

  return (
    <Container>
      {/* {data.pages[state.router.page - 1].map((itemData: any) => {
        const item = state.source[itemData.type][itemData.id];
        return <Item key={item.id} item={item} />;
      })} */}
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
      <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
    </Link>
    <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
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
