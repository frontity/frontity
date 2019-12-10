import { URL } from "frontity";
import {
  HeadTags,
  HeadTag,
  State,
  PostTypeWithHeadTags,
  TaxonomyWithHeadTags
} from "../../types";

// Attributes that could contain links.
const possibleLink = ["href", "content"];

// Test if a path is not from a blog link.
const isInvalid = /^\/(wp-(json|admin|content|includes))|feed|comments|xmlrpc/;

export const getUrlPathname = (url: URL, apiUrl: URL, isWpCom: boolean) => {
  if (url.origin !== apiUrl.origin) throw new Error("Invalid origin");

  // Get API subdirectory.
  const apiSubdir = isWpCom
    ? ""
    : apiUrl.pathname.replace(/\/wp-json\/?$/, "/");

  // Remove the API subdirectory.
  let { pathname } = url;
  if (apiSubdir && pathname.startsWith(apiSubdir))
    pathname = pathname.replace(apiSubdir, "/");

  // Throw an error (to be captured by `useFrontityLinks`).
  if (isInvalid.test(pathname)) throw new Error("Invalid pathname");

  // Return the final path.
  return pathname === "/" ? "" : pathname;
};

export const useFrontityLinks = ({
  state,
  headTags
}: {
  state: State;
  headTags: HeadTags;
}) => {
  // The site URL.
  const frontityUrl = state.frontity.url.replace(/\/?$/, "");

  // The API URL.
  const apiUrl = new URL(state.source.api);
  const { isWpCom } = state.source;

  // For each head tag...
  return headTags.map(({ tag, attributes, content }) => {
    const processed: HeadTag = { tag };

    // Add content if present.
    if (content) processed.content = content;

    // Compute new attributes changing URLs.
    if (attributes) {
      processed.attributes = Object.entries(attributes).reduce(
        (result, [key, value]) => {
          if (possibleLink.includes(key)) {
            try {
              // Transform value into a URL (if possible).
              const url = new URL(value);

              // Get the path of this URL (THROWS AN ERROR IF IS NOT A VALID ONE).
              const pathname = getUrlPathname(url, apiUrl, isWpCom);

              // Set Frontity URL.
              const { search, hash } = url;
              result[key] = `${frontityUrl}${pathname}${search}${hash}`;
            } catch (e) {
              // Don't change the value.
              result[key] = value;
            }
          }
          return result;
        },
        {}
      );
    }

    // Return processed head tag.
    return processed;
  });
};

// Get the entity related to the current link.
export const getCurrentEntity = ({ state }: { state: State }) => {
  const data = state.source.get(state.router.link);

  if (data.isPostType) {
    const { type, id } = data;
    return state.source[type][id] as PostTypeWithHeadTags;
  }

  if (data.isTaxonomy) {
    const { taxonomy, id } = data;
    return state.source[taxonomy][id] as TaxonomyWithHeadTags;
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
export const getCurrentHeadTags = ({ state }: { state: State }) => {
  const entity = getCurrentEntity({ state });
  const headTags = (entity && entity.head_tags) || [];

  // Changes those links that points to WordPress blog pages to Frontity links
  return useFrontityLinks({ state, headTags });
};
