import React from "react";
import { css, connect, useConnect } from "frontity";
import useArchiveInfiniteScroll from "@frontity/hooks/use-archive-infinite-scroll";
import { Packages } from "../../types";
import { isArchive } from "@frontity/source";

/**
 * Component to render archives.
 *
 * @returns A React node.
 */
const Archive: React.FC = () => {
  const { state, actions, libraries } = useConnect<Packages>();
  const current = state.source.get(state.router.link);

  const {
    pages,
    isFetching,
    isError,
    isLimit,
    fetchNext,
  } = useArchiveInfiniteScroll({
    active: state.theme.isInfiniteScrollEnabled,
    limit: state.theme.infiniteScrollLimit,
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
      {pages.map(({ Wrapper, key, link, isLast }) => {
        const { page } = libraries.source.parse(link);
        const data = state.source.get(link);
        return (
          <Wrapper key={key}>
            {isArchive(data) ? (
              <div css={div} data-test={`page-${page}`}>
                Page {page}
                <ul>
                  {data.items.map((item) => (
                    <li key={item.id}>
                      <a
                        data-test={`post-${item.id}-link`}
                        href={item.link}
                        onClick={(e) => {
                          e.preventDefault();
                          actions.router.set(item.link);
                          actions.source.fetch(item.link);
                        }}
                      >
                        {item.link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {isLast && <div data-test="last">You reached the end!</div>}
          </Wrapper>
        );
      })}
      {isFetching && <div data-test="fetching">Fetching</div>}
      {(isError || isLimit) && (
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
