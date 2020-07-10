import React from "react";
import { connect } from "frontity";
import usePostTypeInfiniteScroll from "@frontity/hooks/use-post-type-infinite-scroll";

const PostType: React.FC = () => {
  const things = usePostTypeInfiniteScroll();
  console.log("things:", things);
  return <div>Post Type</div>;
};

export default connect(PostType);
