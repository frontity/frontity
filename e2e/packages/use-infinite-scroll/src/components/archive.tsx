import React from "react";
import { css, connect, useConnect } from "frontity";
import useArchiveInfiniteScroll from "@frontity/hooks/use-archive-infinite-scroll";
import Theme from "../../types";

const Archive: React.FC = () => {
  const { state, libraries } = useConnect<Theme>();
  const current = state.source.get(state.router.link);
  const { pages, isFetching } = useArchiveInfiniteScroll();

  if (!current.isReady) return null;

  const div = css`
    height: 200vh;
  `;

  console.log("isFetching", isFetching);

  return (
    <div data-test="archive">
      {pages.map(({ Wrapper, key, link }) => {
        const { page } = libraries.source.parse(link);
        return (
          <Wrapper key={key}>
            <div css={div} data-test={`page-${page}`}>
              Page {page}
            </div>
          </Wrapper>
        );
      })}
      {isFetching && <div data-test="fetching">Fetching</div>}
    </div>
  );
};

export default connect(Archive, { injectProps: false });
