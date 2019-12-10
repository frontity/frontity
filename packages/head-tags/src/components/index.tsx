import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Package from "../../types";
import { getCurrentHeadTags } from "../utils";

// Render all head tags from the current entity.
const Root: React.FC<Connect<Package>> = ({ state }) => {
  const headTags = getCurrentHeadTags({ state });
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
