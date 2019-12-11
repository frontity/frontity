import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import HeadTagsPackage from "../../types";

// Render all head tags from the current entity.
const Root: React.FC<Connect<HeadTagsPackage>> = ({ state }) => {
  return (
    <Head>
      {state.headTags.current.map(
        ({ tag: Tag, attributes, content }, index) => {
          return (
            <Tag key={index} {...attributes}>
              {content}
            </Tag>
          );
        }
      )}
    </Head>
  );
};

export default connect(Root);
