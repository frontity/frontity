import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import HeadTagsPackage from "../../types";

// Render all head tags from the current entity.
const Root: React.FC<Connect<HeadTagsPackage>> = ({ state }) => {
  // Get current link.
  const { link } = state.router;

  // Get the head tags for that link.
  const headTags = React.useMemo(() => state.headTags.get(link), [link]);

  // Render all tags inside <head>.
  return (
    <Head>
      {headTags.map(({ tag: Tag, attributes, content }, index) => {
        return (
          <Tag key={index} {...attributes}>
            {content}
          </Tag>
        );
      })}
    </Head>
  );
};

export default connect(Root);
