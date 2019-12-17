import { URL } from "frontity";
import {
  HeadTags,
  HeadTag,
  State,
  PostTypeWithHeadTags,
  TaxonomyWithHeadTags
} from "../../types";

// Return a string inviting to ask questions in the community.
const msg = (text: string) => `${text}

If you have any questions, join our community at https://community.frontity.org/.
`;

// Attributes that could contain links.
const possibleLink = ["href", "content"];

const deepTransform = (obj: object, func: Function, ...args: object[]) => {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = func(obj[key], ...args);
    } else if (typeof obj[key] === "object") {
      deepTransform(obj[key], func, ...args);
    }
  }
};

const getWpUrl = (api: string, isWpCom: boolean): URL => {
  const apiUrl = new URL(api);
  if (isWpCom) {
    const { pathname } = apiUrl;
    return new URL(pathname.replace(/^\/wp\/v2\/sites\//, "https://"));
  }
  // Get API subdirectory.
  const apiSubdir = apiUrl.pathname.replace(/\/wp-json\/?$/, "/");
  return new URL(apiSubdir, apiUrl);
};

const shouldTransform = (value: string, prefix: string, ignore: string) => {
  return (
    value.startsWith(prefix) &&
    !new RegExp(ignore).test(value.replace(prefix, ""))
  );
};

const getNewLink = (value: string, base: string, newBase: string) => {
  const { pathname, search, hash } = new URL(value);
  const finalPathname = pathname.replace(
    new RegExp(`^${new URL(base).pathname}`),
    "/"
  );
  return `${newBase.replace(/\/?$/, "")}${finalPathname}${search}${hash}`;
};

const getPrefixFromSource = ({ state }: { state: State }): string => {
  const { api, isWpCom } = state.source;
  return getWpUrl(api, isWpCom).href;
};

const transformLink = ({
  value,
  ignore,
  base,
  newBase
}: {
  value: string;
  ignore: string;
  base: string;
  newBase: string;
}) => {
  if (shouldTransform(value, base, ignore))
    return getNewLink(value, base, newBase);
  return value;
};

export const useFrontityLinks = ({
  state,
  headTags
}: {
  state: State;
  headTags: HeadTags;
}) => {
  /**
   * At this point we assume that `state.headTags.transformLinks` and
   * `state.frontity.url` are defined.
   */
  if (!state.headTags.transformLinks || !state.frontity.url) return headTags;

  // prefix of links to change.
  const base =
    state.headTags.transformLinks.base || getPrefixFromSource({ state });
  const ignore = state.headTags.transformLinks.ignore;

  // The site URL.
  const newBase = state.frontity.url;

  // For each head tag...
  return headTags.map(({ tag, attributes, content }) => {
    // Init processed head tag.
    const processed: HeadTag = { tag };

    if (content) {
      // Set initial content value.
      processed.content = content;

      // Transform URLs inside JSON content.
      if (
        attributes &&
        attributes.type &&
        attributes.type.endsWith("ld+json")
      ) {
        // Try to parse the tag content.
        let json: object;
        try {
          json = JSON.parse(content);
        } catch (e) {
          console.warn(
            msg(
              `The following content of a <script type="ld+json"> tag is not a valid JSON. Links in that tag will not be changed.

${content}`
            )
          );
        }

        // Iterate over json props.
        if (json) {
          deepTransform(json, (value: string) => {
            return transformLink({ value, ignore, base, newBase });
          });
          // Stringify json again.
          processed.content = JSON.stringify(json);
        }
      }
    }

    // Process Attributes.
    if (attributes) {
      processed.attributes = Object.entries(attributes)
        .map(([key, value]) => {
          // Change value if it's a WP blog link.
          if (possibleLink.includes(key)) {
            value = transformLink({ value, ignore, base, newBase });
          }
          // Return the entry.
          return [key, value];
        })
        .reduce((result, [key, value]) => {
          result[key] = value;
          return result;
        }, {});
    }

    // Return processed head tag.
    return processed;
  });
};

// Get the entity related to the current link.
export const getCurrentEntity = ({
  state,
  link
}: {
  state: State;
  link: string;
}) => {
  const data = state.source.get(link);

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
export const getCurrentHeadTags = ({
  state,
  link
}: {
  state: State;
  link: string;
}) => {
  const entity = getCurrentEntity({ state, link });
  const headTags = entity && entity.head_tags;

  // Return an empty array if there is no entity or head tags.
  if (!headTags) return [];

  // Leave head tags unchanged if `transform` is set to false.
  if (!state.headTags.transformLinks) return headTags;

  // Do not change links if `state.frontity.url` is not defined.
  if (!state.frontity || !state.frontity.url) {
    console.warn(
      msg(
        "Property `state.headTags.links.transform` is defined but `state.frontity.url` is not. All links in <head> tags pointing to other site (e.g. WordPress) instead to the Frontity site won't be changed."
      )
    );
    return headTags;
  }

  // Transform links.
  return useFrontityLinks({ state, headTags });
};
