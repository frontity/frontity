import Yoast from "../../types";
import { getEntity, getSocialDefaults, getPathname } from "./utils";
import {
  homeTitle,
  entityTitle,
  authorTitle,
  dateTitle,
  postArchiveTitle,
  notFoundTitle
} from "./titles";

const state: Yoast["state"]["yoast"] = {
  /**
   * Derived value that shows the title for the current route
   * @param state Frontity state
   * @returns Current route's title
   */
  title: ({ state }) => {
    const data = state.source.get(state.router.link);

    // Homepage
    if (data.isHome) return homeTitle({ data, state });

    // Routes with a main entity (taxonomies, posts)
    if (data.isTaxonomy || data.isPostType) return entityTitle({ data, state });

    // Authors
    if (data.isAuthor) return authorTitle({ data, state });

    // Date Archives
    if (data.isDate) return dateTitle({ data, state });

    // Post Type archives
    if (data.isPostTypeArchive) return postArchiveTitle({ data, state });

    // Not found pages
    if (data.isError && data.is404) return notFoundTitle({ state });

    // Default title
    return state.frontity.title;
  },

  /**
   * Derived value that shows the description for the current route
   * @param state Frontity state
   * @returns Current route's description
   */
  description: ({ state }) => {
    const data = state.source.get(state.router.link);
    const entity = getEntity({ state, data });

    // Return the site description by default
    if (!entity) return state.frontity.description;

    const yoastDescription =
      entity.yoast_meta && entity.yoast_meta.yoast_wpseo_metadesc;

    let entityDescription = "";

    if (entity.description)
      entityDescription =
        typeof entity.description === "string"
          ? entity.description
          : entity.description.rendered;

    return yoastDescription || entityDescription || state.frontity.description;
  },

  /**
   * Derived value that shows the canonical link for the current route
   * @param state Frontity state
   * @returns Current route's canonical link
   */
  canonical: ({ state }) =>
    `${state.frontity.url}${getPathname(state.router.link)}`,

  /**
   * Derived value that shows the featured image's URL (if link is a post)
   * @param state Frontity state
   * @returns Current route's featured image URL
   */
  image: ({ state }) => {
    const data = state.source.get(state.router.link);
    if (data.isPost) {
      const post = state.source[data.type][data.id];
      const mediaId = post.featured_media;
      if (mediaId) {
        return state.source.attachment[mediaId].source_url;
      }
    }
    return "";
  },

  /**
   * Derived value that exposes an object with facebook properties for this link
   * @param state Frontity state
   * @returns Facebook properties for current route
   */
  facebook: ({ state }) => {
    const { opengraph } = getSocialDefaults({ state });
    if (!opengraph) return null;

    const data = state.source.get(state.router.link);
    const entity = getEntity({ data, state });

    if (entity && entity.yoast_meta) {
      const {
        yoast_wpseo_facebook_title: title,
        yoast_wpseo_facebook_description: description,
        yoast_wpseo_facebook_type: type,
        yoast_wpseo_facebook_image: image
      } = entity.yoast_meta;

      return { title, description, type, image };
    }

    return null;
  },

  /**
   * Derived value that exposes an object with twitter properties for this link
   * @param state Frontity state
   * @returns Twitter properties for current route
   */
  twitter: ({ state }) => {
    const { twitter } = getSocialDefaults({ state });
    if (!twitter) return null;

    const data = state.source.get(state.router.link);
    const entity = getEntity({ data, state });

    if (entity && entity.yoast_meta && twitter) {
      const {
        yoast_wpseo_twitter_title: title,
        yoast_wpseo_twitter_description: description,
        yoast_wpseo_twitter_image: image
      } = entity.yoast_meta;

      return { title, description, image };
    }

    return null;
  }
};

export default state;
