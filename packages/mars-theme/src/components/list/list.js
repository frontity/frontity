import React from "react";
import { connect, styled, decode } from "frontity";
import ListPage from "./list-page";
// import ArchiveInfiniteScroll from "./archive-infinite-scroll";
import useArchiveInfiniteScroll from "@frontity/hooks/use-archive-infinite-scroll";
import Loading from "../loading";
// import Pagination from "./pagination";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  const { pages } = useArchiveInfiniteScroll({
    limit: 1,
    Component: ListPage,
    Loading,
  });

  return (
    <Container>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header>
          {data.taxonomy}:{" "}
          <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
        </Header>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <Header>
          Author: <b>{decode(state.source.author[data.id].name)}</b>
        </Header>
      )}
      {pages}
      {/* <Pagination /> */}
    </Container>
  );
};

export default connect(List);

const Container = styled.section`
  width: 800px;
  margin: 0;
  padding: 24px;
  list-style: none;
  position: relative;
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
