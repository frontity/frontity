import React from "react";
import connect from "@frontity/connect";
import { Connect } from "@frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";

const Post: React.FC<Connect<MarsTheme>> = () => {
  return (
    <Container>
      <Head>
        <Title>Post Title</Title>
        <Author>By John Doe</Author>
      </Head>
      <Body
        dangerouslySetInnerHTML={{
          __html: "<p>this is a paragrah of content</p>"
        }}
      />
    </Container>
  );
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
