import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import Html2React from "@frontity/html2react/types";
import Source, {
  TaxonomyEntity,
  PostEntity,
  AuthorEntity,
  PostType,
} from "@frontity/source/types";

/**
 * Type for objects that contain the `yoast_head` field.
 */
export type YoastMeta = {
  /**
   * All meta tags in string format.
   */
  yoast_head: string;
};

/**
 * Integrate your Frontity site with Yoast SEO plugin.
 */
interface YoastPackage extends Package {
  /**
   * Root components exported by this package.
   */
  roots: {
    /**
     * Yoast namespace.
     */
    yoast: React.FC;
  };

  /**
   * State exposed by this package.
   */
  state?: {
    /**
     * Source namespace.
     */
    source?: {
      /**
       * Post entities, extended with the `yoast_meta` property.
       */
      post: Record<string, PostEntity & YoastMeta>;

      /**
       * Page entities, extended with the `yoast_meta` property.
       */
      page: Record<string, PostEntity & YoastMeta>;

      /**
       * Author entities, extended with the `yoast_meta` property.
       */
      author: Record<string, AuthorEntity & YoastMeta>;

      /**
       * Type entities, extended with the `yoast_meta` property.
       */
      type: Record<string, PostType & YoastMeta>;

      /**
       * Category entities, extended with the `yoast_meta` property.
       */
      category: Record<string, TaxonomyEntity & YoastMeta>;

      /**
       * Tag entities, extended with the `yoast_meta` property.
       */
      tag: Record<string, TaxonomyEntity & YoastMeta>;
    };
  };
}

export default YoastPackage;

/**
 * Packages that are dependencies of YoastPackage.
 */
export type Packages = YoastPackage & Router & Source & Html2React;
