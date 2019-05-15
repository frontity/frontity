import React from "react";
import { connect, styled } from "frontity";

const Post = ({ state, actions }) => {
  // Get info of current post.
  const data = state.source.data(state.router.path);
  // Get the the post.
  const post = state.source[data.type][data.id];
  // Get the author.
  const author = state.source.author[post.author];

  // Prefetch home posts if they are not fetched yet.
  actions.source.fetch("/");

  return (
    <Container>
      <Head>
        <Title>{post.title.rendered}</Title>
        {/* Only output the author name if it's a post. */}
        {data.isPost && <Author>By {author.name}</Author>}
      </Head>
      <Body
        dangerouslySetInnerHTML={{
          __html: post.content.rendered
        }}
      />
    </Container>
  );
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
