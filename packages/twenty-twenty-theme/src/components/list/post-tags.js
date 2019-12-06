import { connect } from "frontity";
import React, { Fragment } from "react";
import { TagIcon } from "../icons";
import Link from "../link";
import { PostMetaList, PostMetaWrapper } from "./post-meta";
import PostMetaItem from "./post-meta-item";

const PostTags = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <PostMetaWrapper>
      <PostMetaList style={{ justifyContent: "flex-start" }}>
        <PostMetaItem icon={TagIcon} label="Post Tags">
          {tags.map((tag, index) => {
            const isLastTag = index === tags.length - 1;
            return (
              <Fragment key={tag.id}>
                <Link link={tag.link}>{tag.name}</Link>
                {!isLastTag && <>, </>}
              </Fragment>
            );
          })}
        </PostMetaItem>
      </PostMetaList>
    </PostMetaWrapper>
  );
};

export default connect(PostTags);
