import React from "react";
import { css, connect, useConnect } from "frontity";
import useArchiveInfiniteScroll from "@frontity/hooks/use-archive-infinite-scroll";
import Theme from "../../types";

const Archive: React.FC = () => {
  const { state, libraries } = useConnect<Theme>();
  const current = state.source.get(state.router.link);
  const { pages, isFetching, isError, fetchNext } = useArchiveInfiniteScroll({
    fetchInViewOptions: {
      root: document as any,
      rootMargin: "400px 0px",
      triggerOnce: true,
    },
    routeInViewOptions: {
      root: document as any,
      rootMargin: "-80% 0% -19.9999% 0%",
    },
  });

  if (!current.isReady) return null;

  const div = css`
    height: 200vh;
  `;

  const fetchDiv = css`
    height: 100vh;
  `;

  return (
    <div data-test="archive">
      {pages.map(({ Wrapper, key, link }) => {
        const { page } = libraries.source.parse(link);
        const data = state.source.get(link);
        return (
          <Wrapper key={key}>
            {data.isArchive ? (
              <div css={div} data-test={`page-${page}`}>
                Page {page}
                <ul>
                  {data.items.map((item) => (
                    <li key={item.id}>{item.link}</li>
                  ))}
                </ul>
              </div>
            ) : null}
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

export default connect(Archive, { injectProps: false });
