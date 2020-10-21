/**
 * These types were partially generated using
 * [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript)
 * to transform the default schemas exposed by the WordPress REST API.
 *
 * Those schemas are accessible making an OPTIONS call to each endpoint.
 */

/**
 * Empty interface from which all entities inherit.
 */
export interface Entity {
  [k: string]: unknown;
}

/**
 * Cover some cases of objects with `rendered` property.
 */
interface Rendered {
  /**
   * Property of the object, transformed for display.
   */
  rendered?: string;
  [k: string]: unknown;
}

/**
 * Base interface for all post type entities.
 *
 * Interfaces that extends from this one are:
 * - {@link PostEntity}.
 * - {@link PageEntity}.
 * - {@link AttachmentEntity}.
 * - {@link RevisionEntity}.
 */
export interface PostTypeEntity extends Entity {
  /**
   * The date the object was published, in the site's timezone.
   */
  date?: string | null;

  /**
   * The date the object was published, as GMT.
   */
  date_gmt?: string | null;

  /**
   * The globally unique identifier for the object.
   */
  guid?: Rendered;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * Unique identifier for the object.
   */
  id: number;

  /**
   * URL to the object.
   */
  link: string;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug: string;

  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";

  /**
   * Type of Post for the object.
   */
  type?: string;

  /**
   * The title for the object.
   */
  title?: Rendered;

  /**
   * The ID for the author of the object.
   */
  author?: number;

  /**
   * Whether or not comments are open on the object.
   */
  comment_status?: "open" | "closed";

  /**
   * Whether or not the object can be pinged.
   */
  ping_status?: "open" | "closed";
}

/**
 * Interface for entities from the /wp/v2/posts endpoint.
 */
export interface PostEntity extends PostTypeEntity {
  /**
   * Type of Post for the object.
   */
  type: "post";

  /**
   * The content for the object.
   */
  content?: Rendered;

  /**
   * The excerpt for the object.
   */
  excerpt?: Rendered;

  /**
   * The format for the object.
   */
  format?:
    | "standard"
    | "aside"
    | "chat"
    | "gallery"
    | "link"
    | "image"
    | "quote"
    | "status"
    | "video"
    | "audio";

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;

  /**
   * Whether or not the object should be treated as sticky.
   */
  sticky?: boolean;

  /**
   * The theme file to use to display the object.
   */
  template?: string;

  /**
   * The terms assigned to the object in the category taxonomy.
   */
  categories?: number[];

  /**
   * The terms assigned to the object in the post_tag taxonomy.
   */
  tags?: number[];

  /**
   * The ID of the featured media for the object.
   */
  featured_media?: number;
}

/**
 * Interface for entities from the /wp/v2/posts/1/revisions endpoint.
 */
export interface RevisionEntity extends PostTypeEntity {
  /**
   * The ID for the author of the object.
   */
  author?: number;

  /**
   * The ID for the parent of the object.
   */
  parent?: number;

  /**
   * The content for the object.
   */
  content?: Rendered;

  /**
   * The excerpt for the object.
   */
  excerpt?: Rendered;
}

/**
 * Interface for entities from the /wp/v2/pages endpoint.
 */
export interface PageEntity extends PostTypeEntity {
  /**
   * Type of Post for the object.
   */
  type: "page";

  /**
   * The ID for the parent of the object.
   */
  parent?: number;

  /**
   * The content for the object.
   */
  content?: Rendered;

  /**
   * The excerpt for the object.
   */
  excerpt?: Rendered;

  /**
   * The order of the object in relation to other object of its type.
   */
  menu_order?: number;

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;

  /**
   * The theme file to use to display the object.
   */
  template?: string;

  /**
   * The ID of the featured media for the object.
   */
  featured_media?: number;
}

/**
 * Interface for entities from the /wp/v2/media endpoint.
 */
export interface AttachmentEntity extends Entity {
  /**
   * Type of Post for the object.
   */
  type: "attachment";

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;

  /**
   * The theme file to use to display the object.
   */
  template?: string;

  /**
   * Alternative text to display when attachment is not displayed.
   */
  alt_text?: string;

  /**
   * The attachment caption.
   */
  caption?: Rendered;

  /**
   * The attachment description.
   */
  description?: Rendered;

  /**
   * Attachment type.
   */
  media_type?: "image" | "file";

  /**
   * The attachment MIME type.
   */
  mime_type?: string;

  /**
   * Details about the media file, specific to its type.
   */
  media_details?: Record<string, unknown>;

  /**
   * The ID for the associated post of the attachment.
   */
  post?: number;

  /**
   * URL to the original attachment file.
   */
  source_url?: string;

  /**
   * List of the missing image sizes of the attachment.
   */
  missing_image_sizes?: string[];
  [k: string]: unknown;
}

/**
 * Interface for entities that represents types.
 *
 * Interfaces that extends from this one are:
 * - {@link PostType}.
 * - {@link TaxonomyType}.
 */
export interface TypeEntity extends Entity {
  /**
   * A human-readable description of the post type.
   */
  description?: string;

  /**
   * Whether or not the post type should have children.
   */
  hierarchical?: boolean;

  /**
   * The title for the post type.
   */
  name?: string;

  /**
   * An alphanumeric identifier for the post type.
   */
  slug?: string;

  /**
   * Taxonomies associated with post type.
   */
  taxonomies?: string[];

  /**
   * REST base route for the post type.
   */
  rest_base?: string;
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/types endpoint.
 */
export interface PostType extends TypeEntity {
  /**
   * Taxonomies associated with post type.
   */
  taxonomies?: string[];
}
/**
 * Interface for entities from the /wp/v2/taxonomy endpoint.
 */
export interface TaxonomyType extends TypeEntity {
  /**
   * Types associated with the taxonomy.
   */
  types?: string[];
}

/**
 * Interface for terms that belong to a taxonomy.
 *
 * For example:
 * - entities from the /wp/v2/categories endpoint.
 * - entities from the /wp/v2/tags endpoint.
 */
export interface TaxonomyEntity extends Entity {
  /**
   * Unique identifier for the term.
   */
  id?: number;

  /**
   * Number of published posts for the term.
   */
  count?: number;

  /**
   * HTML description of the term.
   */
  description?: string;

  /**
   * URL of the term.
   */
  link?: string;

  /**
   * HTML title for the term.
   */
  name?: string;

  /**
   * An alphanumeric identifier for the term unique to its type.
   */
  slug?: string;

  /**
   * Type attribution for the term.
   */
  taxonomy?: string;

  /**
   * The parent term ID.
   */
  parent?: number;

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;
  [k: string]: unknown;
}

/**
 * Map of avatar URLs by their size.
 */
export interface AvatarUrls {
  /**
   * Avatar URL with image size of 24 pixels.
   */
  "24"?: string;

  /**
   * Avatar URL with image size of 48 pixels.
   */
  "48"?: string;

  /**
   * Avatar URL with image size of 96 pixels.
   */
  "96"?: string;
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/users endpoint.
 */
export interface AuthorEntity extends Entity {
  /**
   * Unique identifier for the user.
   */
  id?: number;

  /**
   * Display name for the user.
   */
  name?: string;

  /**
   * URL of the user.
   */
  url?: string;

  /**
   * Description of the user.
   */
  description?: string;

  /**
   * Author URL of the user.
   */
  link?: string;

  /**
   * An alphanumeric identifier for the user.
   */
  slug?: string;

  /**
   * Avatar URLs for the user.
   */
  avatar_urls?: AvatarUrls;

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/comments endpoint.
 */
export interface CommentEntity extends Entity {
  /**
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * The ID of the user object, if author was a user.
   */
  author?: number;

  /**
   * Email address for the object author.
   */
  author_email?: string;

  /**
   * Display name for the object author.
   */
  author_name?: string;

  /**
   * URL for the object author.
   */
  author_url?: string;

  /**
   * The content for the object.
   */
  content?: Rendered;

  /**
   * The date the object was published, in the site's timezone.
   */
  date?: string;

  /**
   * The date the object was published, as GMT.
   */
  date_gmt?: string;

  /**
   * URL to the object.
   */
  link?: string;

  /**
   * The ID for the parent of the object.
   */
  parent?: number;

  /**
   * The ID of the associated post object.
   */
  post?: number;

  /**
   * State of the object.
   */
  status?: string;

  /**
   * Type of Comment for the object.
   */
  type?: string;

  /**
   * Avatar URLs for the object author.
   */
  author_avatar_urls?: AvatarUrls;

  /**
   * Meta fields.
   */
  meta?: Record<string, unknown>;
  [k: string]: unknown;
}
