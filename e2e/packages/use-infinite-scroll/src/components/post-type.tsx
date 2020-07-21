import React from "react";
import { css, connect, useConnect } from "frontity";
import usePostTypeInfiniteScroll from "@frontity/hooks/use-post-type-infinite-scroll";
import Theme from "../../types";

const PostType: React.FC = () => {
  const { state } = useConnect<Theme>();
  const current = state.source.get(state.router.link);
  const { posts, isFetching } = usePostTypeInfiniteScroll();

  if (!current.isReady) return null;

  const div = css`
    height: 200vh;
  `;

  return (
    <div data-test="post-type">
      {posts.map(({ Wrapper, key, link }) => {
        const { id } = state.source.get(link);
        return (
          <Wrapper key={key}>
            <div css={div} data-test={`post-${id}`}>
              Post {id}
            </div>
          </Wrapper>
        );
      })}
      {isFetching && <div data-test="fetching">Fetching</div>}
    </div>
  );
};

export default connect(PostType);
