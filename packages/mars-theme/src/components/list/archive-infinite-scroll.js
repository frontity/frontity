import React from "react";
import { connect } from "frontity";
import InfiniteScroll from "./infinite-scroll";

const ArchiveInfiniteScroll = ({ state, link, Page, Loading }) => {
  const data = state.source.get(link || state.router.link);
  const links = state.router.state.links || [data.link];

  return links.map((link) => (
    <InfiniteScroll key={link} link={link} Page={Page} Loading={Loading} />
  ));
};

export default connect(ArchiveInfiniteScroll);
