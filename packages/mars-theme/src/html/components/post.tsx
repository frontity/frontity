import React from "react";
import connect from "@frontity/connect";
import Connect from "@frontity/types/connect";
import MarsTheme from "../../../type";
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

const Container = styled.div``;

const Head = styled.div``;

const Title = styled.h1`
  display: flex;
  width: 800px;
`;

const Author = styled.p``;

const Body = styled.div``;
