import React from "react";
import { connect } from "frontity";
import useArchiveInfiniteScroll from "@frontity/hooks/use-archive-infinite-scroll";

const Archive: React.FC = () => {
  const things = useArchiveInfiniteScroll();
  console.log("things:", things);
  return <div>Archive</div>;
};

export default connect(Archive);
