import React from "react";
import { connect, styled } from "frontity";

const Post = ({ state }) => {
  const { isReady, type, id } = state.source.data(state.router.path);
  const post = state.source[type][id];
  const author = state.source.author[post.author];

  return isReady ? (
    <Container>
      <Head>
        <Title>{post.title.rendered}</Title>
        <Author>By {author.name}</Author>
      </Head>
      <Body
        dangerouslySetInnerHTML={{
          __html: post.content.rendered
        }}
      />
    </Container>
  ) : null;
};

export default connect(Post);

const Container = styled.div`
  width: 800px;
  margin: 0;
  list-style: none;
  padding: 24px;
`;

const Head = styled.div``;

const Title = styled.h1`
  margin: 0;
  color: #451804;
`;

const Author = styled.p``;

const Body = styled.div``;
