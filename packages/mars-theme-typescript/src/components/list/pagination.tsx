import { useEffect } from "react";
import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { ArchiveData } from "@frontity/source/types";

/**
 * Props received by the {@link Pagination} component.
 */
interface PaginationProps {
  /**
   * Data object representing an archive link.
   */
  data: ArchiveData;
}

/**
 * Render a pagination component, used to allow the user to navigate between a
 * list of posts.
 *
 * @param props - Object of type {@link PaginationProps}.
 * @returns Pagination component.
 */
const Pagination = ({ data }: PaginationProps): JSX.Element => {
  const { actions } = useConnect<Packages>();

  // Pre-fetch the the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (data.next) actions.source.fetch(data.next);
  }, [actions.source, data.next]);

  return (
    <div>
      {/* If there's a next page, render this link */}
      {data.next && (
        <Link link={data.next}>
          <Text>← Older posts</Text>
        </Link>
      )}

      {data.previous && data.next && " - "}

      {/* If there's a previous page, render this link */}
      {data.previous && (
        <Link link={data.previous}>
          <Text>Newer posts →</Text>
        </Link>
      )}
    </div>
  );
};

export default connect(Pagination);

const Text = styled.em`
  display: inline-block;
  margin-top: 16px;
`;
