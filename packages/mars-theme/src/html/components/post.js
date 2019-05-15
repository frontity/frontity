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
  width: 840px;
  margin: 0;
  padding: 24px;
`;

const Head = styled.div``;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  color: rgba(12, 17, 43);
`;

const Author = styled.p``;

const Body = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);

  * {
    max-width: 100%;
  }

  figure {
    margin: 24px 0;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    figcaption {
      font-size: 0.7em;
    }
  }
`;
