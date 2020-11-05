import { Package, Derived, MergePackages } from "frontity/types";
import Router from "@frontity/router/types";
import Source, {
  TermEntity,
  PostEntity,
  AuthorEntity,
  TypeEntity,
} from "@frontity/source/types";

/**
 * Object describing an HTML head tag.
 *
 * @example
 * ```
 * // <title>mburridge, Author at Frontity</title>
 *
 * {
 *   "tag": "title",
 *   "content": "mburridge, Author at Frontity"
 * }
 * ```
 *
 * @example
 * ```
 * // <meta name="robots" content="noindex, follow">
 * {
 *   "tag": "meta",
 *   "attributes": {
 *     "name": "robots",
 *     "content": "noindex, follow"
 *   }
 * }
 * ```
 */
export interface HeadTag {
  /**
   * HTML tag name.
   */
  tag: "meta" | "link" | "title" | "style" | "script" | "noscript" | "base";

  /**
   * HTML attributes for this tag.
   */
  attributes?: Record<string, string>;

  /**
   * Text content inside this tag.
   */
  content?: string;
}

/**
 * Object containing the `head_tags` property.
 */
export interface WithHeadTags {
  /**
   * Array of {@link HeadTag}.
   */
  head_tags?: HeadTag[];
}

/**
 * Integrate your Frontity site with REST API - Head Tags by Frontity.
 */
interface HeadTagsPackage extends Package {
  /**
   * Package name.
   */
  name: "@frontity/head-tags";
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Head Tags root component.
     */
    headTags: React.FC;
  };

  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Head Tags namespace.
     */
    headTags: {
      /**
       * Return an array of head tags for the given link.
       *
       * @example state.headTags.get("/2016/the-beauties-of-gullfoss");
       *
       * @param link - Any link in your site.
       * @returns An array of {@link HeadTag}, if the given link points to an
       * entity with the `head_tags` field.
       */
      get: Derived<Packages, string, HeadTag[]>;

      /**
       * Define a set of properties to transform links present in the
       * `head_tags` field in case you are using Frontity in decoupled mode.
       *
       * If you are using Frontity in embedded mode, this property must be set
       * to `false`.
       *
       * @example
       * ```
       * {
       *   ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
       *   base: "https://wp.mysite.com"
       * }
       * ```
       *
       * @example false
       */
      transformLinks:
        | {
            /**
             * RegExp in string format that defines a set of links that must
             * not be transformed.
             *
             * @defaultValue
             * ```
             * "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
             * ```
             */
            ignore: string;

            /**
             * WordPress URL base that must be replaced by the Frontity URL
             * base (specified in `state.frontity.url`). If this value is not
             * set, it is computed from `state.source.api`.
             */
            base?: string;
          }
        | false;
    };

    /**
     * Source namespace.
     */
    source?: {
      /**
       * True when the REST API belongs to a WordPress.com site.
       */
      isWpCom?: boolean;
      /**
       * The URL of the REST API.
       *
       * It can be from a self-hosted WordPress or from a WordPress.com site.
       *
       * @example "https://your-site.com/wp-json"
       * @example "https://public-api.wordpress.com/wp/v2/sites/your-site.wordpress.com"
       */
      api: string;

      /**
       * Post entities by ID, extended with a `head_tags` property.
       */
      post: Record<string, PostEntity & WithHeadTags>;

      /**
       * Page entities by ID, extended with a `head_tags` property.
       */
      page: Record<string, PostEntity & WithHeadTags>;

      /**
       * Author entities by ID, extended with a `head_tags` property.
       */
      author: Record<string, AuthorEntity & WithHeadTags>;

      /**
       * Type entities by ID, extended with a `head_tags` property.
       */
      type: Record<string, TypeEntity & WithHeadTags>;

      /**
       * Category entities by ID, extended with a `head_tags` property.
       */
      category: Record<string, TermEntity & WithHeadTags>;

      /**
       * Tag entities by ID, extended with a `head_tags` property.
       */
      tag: Record<string, TermEntity & WithHeadTags>;
    };
  };
}

/**
 * The Head Tags package and its dependencies joined together.
 */
export type Packages = MergePackages<HeadTagsPackage, Source, Router>;

export default HeadTagsPackage;
