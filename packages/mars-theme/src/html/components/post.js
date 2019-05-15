import React from "react";
import { connect, styled } from "frontity";

const Post = ({ state }) => {
  const { isReady, type, id, isPost } = state.source.data(state.router.path);
  const post = state.source[type][id];
  const author = state.source.author[post.author];
  const date = new Date(post.date);

  return isReady ? (
    <Container>
      <Head>
        <Title>{post.title.rendered}</Title>
        {isPost && (
          <>
            <Author>
              By <b>{author.name}</b>
            </Author>
            <Fecha>
              {" "}
              on <b>{date.toDateString()}</b>
            </Fecha>
          </>
        )}
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
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
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

const Body = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);

  * {
    max-width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px 0;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }
`;
