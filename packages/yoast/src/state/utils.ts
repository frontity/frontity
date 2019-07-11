import { YoastSocialDefaults, YoastMeta } from "../../types";
import { Author, Taxonomy, PostType, Attachment } from "@frontity/source/";

export type Entity = (Author | Taxonomy | PostType | Attachment) & {
  yoast_meta: YoastMeta;
};

export const getEntity = ({ state, data }): Entity => {
  if (data.isPostType) return state.source[data.type][data.id];
  if (data.isTaxonomy) return state.source[data.taxonomy][data.id];
  if (data.isAuthor) return state.source.author[data.id];
  return null;
};

export const appendPage = ({
  title,
  page,
  totalPages
}: {
  title: string;
  page: number;
  totalPages: number;
}) => (page > 1 ? `${title} - Page ${page} of ${totalPages}` : title);

export const getSocialDefaults = ({ state }): YoastSocialDefaults => {
  const data = state.source.get(state.router.link);

  let type: string;
  let id: number;

  if (data.isArchive) ({ type, id } = data.items[0]);
  if (data.isPostType) ({ type, id } = data);

  if (type && id)
    return state.source[type][id].yoast_meta.yoast_wpseo_social_defaults;
};

export const getPage = route => {
  // get pathname from route
  const [, pathname] = /^(?:(?:[^:/?#]+):)?(?:\/\/(?:[^/?#]*))?([^?#]*)/.exec(
    route
  );

  const [, page] = /^(?:.*)page\/(\d+)\/?(\?.*)?$/.exec(pathname) || [
    null,
    "1"
  ];

  return parseInt(page, 10);
};

export const hasName = (
  entity: Entity
): entity is (Author | Taxonomy) & {
  yoast_meta: YoastMeta;
} => "name" in entity;
