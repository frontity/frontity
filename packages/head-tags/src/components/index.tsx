import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import { useFrontityLinks } from "../utils";
import Package, { HeadTags, State, Entity } from "../../types";

type GetCurrentEntity = (args: { state: State }) => Entity | null;
type GetCurrentHeadTags = (args: { state: State }) => HeadTags;

// Get the entity related to the current link.
const getCurrentEntity: GetCurrentEntity = ({ state }) => {
  const data = state.source.get(state.router.link);

  if (data.isPostType) {
    const { type, id } = data;
    return state.source[type][id];
  }

  if (data.isTaxonomy) {
    const { taxonomy, id } = data;
    return state.source[taxonomy][id];
  }

  if (data.isAuthor) {
    const { id } = data;
    return state.source.author[id];
  }

  if (data.isPostTypeArchive) {
    const { type } = data;
    return state.source.type[type];
  }

  return null;
};

/**
 * Get the head tags stored in the current entity,
 * or an empty array if there is no entity or head tags.
 */
const getCurrentHeadTags: GetCurrentHeadTags = ({ state }) => {
  const entity = getCurrentEntity({ state });
  const headTags = (entity && entity.head_tags) || [];

  // Changes those links that points to WordPress blog pages to Frontity links
  return useFrontityLinks({ state, headTags });
};

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
