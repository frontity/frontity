import React from "react";
import { connect } from "frontity";
import usePostTypeInfiniteScroll from "@frontity/hooks/use-post-type-infinite-scroll";

const PostType: React.FC = () => {
  const { posts, isFetching } = usePostTypeInfiniteScroll();
  return <div data-test="post-type">Post Type</div>;
};

export default connect(PostType);
