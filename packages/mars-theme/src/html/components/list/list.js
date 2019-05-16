import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.data(state.router.path);
  // Get the items of the current page.
  const items = data.pages[state.router.page - 1];

  return data.isReady ? (
    <Container>
      {items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one Item for each one.
        return <Item key={item.id} item={item} />;
      })}
    </Container>
  ) : null;
};

const Item = connect(({ state, item }) => {
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <ItemContainer>
      <Link href={item.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
      </Link>
      <Author>
        By <b>{author.name}</b>
      </Author>
      <Fecha>
        {" "}
        on <b>{date.toDateString()}</b>
      </Fecha>
      <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
    </ItemContainer>
  );
});

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
  margin-bottom: 8px;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Fecha = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
