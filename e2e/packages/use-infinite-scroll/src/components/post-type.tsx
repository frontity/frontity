import React from "react";
import { css, connect, useConnect } from "frontity";
import usePostTypeInfiniteScroll from "@frontity/hooks/use-post-type-infinite-scroll";
import Theme from "../../types";

const PostType: React.FC = () => {
  const { state } = useConnect<Theme>();
  const current = state.source.get(state.router.link);
  const { posts, isFetching, isError, fetchNext } = usePostTypeInfiniteScroll();

  if (!current.isReady) return null;

  const div = css`
    height: 200vh;
  `;

  const fetchDiv = css`
    height: 100vh;
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
      {isError && (
        <div data-test="error" css={fetchDiv}>
          <button data-test="fetch" onClick={fetchNext}>
            Fetch Next
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(PostType);
