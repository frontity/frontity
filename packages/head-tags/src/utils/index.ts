import { warn } from "frontity";
import { State } from "frontity/types";
import { Packages, HeadTag, WithHeadTags } from "../../types";
import {
  isPostType,
  isTerm,
  isAuthor,
  isPostTypeArchive,
} from "@frontity/source";

// Attributes that could contain links.
const possibleLink = ["href", "content"];

/**
 * Iterates over an object, executing the suplied function.
 *
 * @param obj - The object that will be iterated.
 * @param func - The function that will be executed. The first parameter is the
 * object property and the rest are defined in `args`.
 * @param args - The rest of the parameters of the function.
 */
const deepTransform = (obj: object, func: Function, ...args: object[]) => {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = func(obj[key], ...args);
    } else if (typeof obj[key] === "object") {
      deepTransform(obj[key], func, ...args);
    }
  }
};

/**
 * Extracts the WordPress URL from `state.source.api`.
 *
 * @param api - The api field, normally `state.source.api`.
 * @param isWpCom - If it's WP.com or not.
 *
 * @returns A URL object with the WordPress base URL.
 */
export const getWpUrl = (api: string, isWpCom: boolean): URL => {
  const apiUrl = new URL(api);
  if (isWpCom) {
    const { pathname } = apiUrl;
    return new URL(pathname.replace(/^\/wp\/v2\/sites\//, "https://"));
  }
  // Get API subdirectory.
  const apiSubdir = apiUrl.pathname.replace(/\/wp-json\/?$/, "/");
  return new URL(apiSubdir, apiUrl);
};

/**
 * Checks if the link should be transformed to the Frontity URL or left as it
 * is, usually the WordPress URL.
 *
 * @param link - The link that will be checked.
 * @param base - The base that the link needs to have, usually the WordPress
 * URL.
 * @param ignore - A Regexp (in a string format) used to know if the link
 * should be changed or not.
 *
 * @returns A boolean indicating if the link should be transformed.
 */
const shouldTransform = (link: string, base: string, ignore: string) => {
  return (
    link.startsWith(base) && !new RegExp(ignore).test(link.replace(base, ""))
  );
};

/**
 * The function that actually transforms the link in the new one.
 *
 * @param link - The original link.
 * @param base - The old base (hostname and path). Usually the WordPress URL.
 * @param newBase - The new base (hostname and path). Usually the Frontity URL.
 *
 * @returns The transformed link.
 */
const getNewLink = (link: string, base: string, newBase: string) => {
  const { pathname, search, hash } = new URL(link);
  const finalPathname = pathname.replace(
    new RegExp(`^${new URL(base).pathname}`),
    "/"
  );
  return `${newBase.replace(/\/?$/, "")}${finalPathname}${search}${hash}`;
};

/**
 * A function that extracts the WordPress URL from `state.source.api`.
 *
 * @param state - The Frontity state.
 *
 * @returns The WordPress URL, without the prefix (usually `/wp-json`).
 */
const getBaseFromSource = (state: State<Packages>): string => {
  const { api, isWpCom } = state.source;
  return getWpUrl(api, isWpCom).href;
};

/**
 * The options of the {@link transformLink} function.
 */
interface TransformLinkOptions {
  /**
   * The link that will be changed.
   */
  link: string;
  /**
   * The old base (hostname and path) that will be changed by the `newBase`.
   */
  base: string;
  /**
   * The new base that will replace the old `base`.
   */
  newBase: string;
  /**
   * A Regexp (in string format) so that if the link matches the transform
   * doesn't happen.
   */
  ignore: string;
}

/**
 * Changes the URL hostname to the Frontity one, instead of the WordPress one.
 *
 * @param options - Defined in {@link TransformLinkOptions}.
 *
 * @returns The new link.
 */
export const transformLink = ({
  link,
  ignore,
  base,
  newBase,
}: TransformLinkOptions) => {
  if (shouldTransform(link, base, ignore))
    return getNewLink(link, base, newBase);
  return link;
};

/**
 * The options of the {@link transformHeadTags} function.
 */
interface TransformHeadTagsOptions {
  /**
   * The Frontity state.
   */
  state: State<Packages>;

  /**
   * The `head_tags` array that usually comes from the REST API.
   */
  headTags: HeadTag[];
}

/**
 * Return a copy of the given head tags, transforming all links found that
 * should point to the Frontity server according to
 * `state.source.transformLinks`.
 *
 * @param options - Defined in {@link TransformHeadTagsOptions}.
 *
 * @returns The modified head tags array.
 */
export const transformHeadTags = ({
  state,
  headTags,
}: TransformHeadTagsOptions) => {
  /**
   * At this point we assume that `state.headTags.transformLinks` and
   * `state.frontity.url` are defined.
   */
  if (!state.headTags.transformLinks || !state.frontity.url) return headTags;

  // Prefix of links to change.
  const base = state.headTags.transformLinks.base || getBaseFromSource(state);
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
          warn(
            `The following content of a <script type="ld+json"> tag is not a valid JSON. Links in that tag will not be changed.

${content}`
          );
        }

        // Iterate over json props.
        if (json) {
          deepTransform(json, (link: string) => {
            return transformLink({ link, ignore, base, newBase });
          });
          // Stringify json again.
          processed.content = JSON.stringify(json);
        }
      }
    }

    // Process Attributes.
    if (attributes) {
      processed.attributes = Object.entries(attributes)
        .map(([key, link]) => {
          // Change link if it's a WP blog link.
          if (possibleLink.includes(key)) {
            link = transformLink({ link, ignore, base, newBase });
          }
          // Return the entry.
          return [key, link];
        })
        .reduce((result, [key, link]) => {
          result[key] = link;
          return result;
        }, {});
    }

    // Return processed head tag.
    return processed;
  });
};

/**
 * The options of the {@link getHeadTags} function.
 */
interface GetHeadTagsOptions {
  /**
   * The Frontity state.
   */
  state: State<Packages>;

  /**
   * The link (URL) of the entity.
   */
  link: string;
}

/**
 * Get the head tags stored in the entity pointed by `link`, or an empty array
 * if there is no entity nor head tags.
 *
 * @param options - Defined in {@link HeadTagsOptions}.
 *
 * @returns Either the transformed head tags or an empty array if they are not
 * found.
 */
export const getHeadTags = ({ state, link }: GetHeadTagsOptions) => {
  // Get the data object associated to link.
  const data = state.source.get(link);

  // Get the entity pointed by the given link.
  let entity: WithHeadTags = null;

  // Entities are stored in different places depending on their type.
  if (isPostType(data)) {
    const { type, id } = data;
    entity = state.source[type][id];
  } else if (isTerm(data)) {
    const { taxonomy, id } = data;
    entity = state.source[taxonomy][id];
  } else if (isAuthor(data)) {
    const { id } = data;
    entity = state.source.author[id];
  } else if (isPostTypeArchive(data)) {
    const { type } = data;
    entity = state.source.type[type];
  }

  // Get the `head_tags` field from the entity.
  const headTags = entity?.head_tags;

  // Return an empty array if there is no entity or head tags.
  if (!headTags) return [];

  // Leave head tags unchanged if `transform` is set to false.
  if (!state.headTags.transformLinks) return headTags;

  // Do not change links if `state.frontity.url` is not defined.
  if (!state.frontity || !state.frontity.url) {
    warn(
      "Property `state.headTags.links.transform` is defined but `state.frontity.url` is not. All links in <head> tags pointing to other site (e.g. WordPress) instead to the Frontity site won't be changed."
    );
    return headTags;
  }

  // Transform links.
  return transformHeadTags({ state, headTags });
};
