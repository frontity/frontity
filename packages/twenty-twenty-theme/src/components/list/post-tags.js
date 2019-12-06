import { connect } from "frontity";
import React from "react";
import { TagIcon } from "../icons";
import Link from "../link";
import { PostMetaList, PostMetaWrapper } from "./post-meta";
import PostMetaItem from "./post-meta-item";

const PostTags = ({ tags }) => {
  return (
    <PostMetaWrapper>
      <PostMetaList style={{ justifyContent: "flex-start" }}>
        <PostMetaItem icon={TagIcon} label="Post Tags">
          {tags.map((tag, index) => {
            const isLastTag = index === tags.length - 1;
            return (
              <>
                <Link link={tag.link}>{tag.name}</Link>
                {!isLastTag && <>, </>}
              </>
            );
          })}
        </PostMetaItem>
      </PostMetaList>
    </PostMetaWrapper>
  );
};

export default connect(PostTags);
