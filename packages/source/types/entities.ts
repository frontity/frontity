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
 * The title for the object.
 */
interface EntityTitle {
  /**
   * Title for the object, as it exists in the database.
   */
  raw?: string;

  /**
   * HTML title for the object, transformed for display.
   */
  rendered?: string;
  [k: string]: unknown;
}

/**
 * The content for the object.
 */
interface EntityContent {
  /**
   * Content for the object, as it exists in the database.
   */
  raw?: string;

  /**
   * HTML content for the object, transformed for display.
   */
  rendered?: string;

  /**
   * Version of the content block format used by the object.
   */
  block_version?: number;

  /**
   * Whether the content is protected with a password.
   */
  protected?: boolean;
  [k: string]: unknown;
}

/**
 * The excerpt for the object.
 */
interface EntityExcerpt {
  /**
   * Excerpt for the object, as it exists in the database.
   */
  raw?: string;

  /**
   * HTML excerpt for the object, transformed for display.
   */
  rendered?: string;

  /**
   * Whether the excerpt is protected with a password.
   */
  protected?: boolean;
  [k: string]: unknown;
}

/**
 * Base interface for all post type entities.
 *
 * Interfaces that extends from this one are:
 * - {@link PostEntity}.
 * - {@link PageEntity}.
 * - {@link AttachmentEntity}.
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
  guid?: {
    /**
     * GUID for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * GUID for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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
  title?: EntityTitle;

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
  content?: EntityContent;

  /**
   * The excerpt for the object.
   */
  excerpt?: EntityExcerpt;

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
  meta?: {
    [k: string]: unknown;
  };

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
  content?: EntityContent;

  /**
   * The excerpt for the object.
   */
  excerpt?: EntityExcerpt;
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
  content?: EntityContent;

  /**
   * The excerpt for the object.
   */
  excerpt?: EntityExcerpt;

  /**
   * The order of the object in relation to other object of its type.
   */
  menu_order?: number;

  /**
   * Meta fields.
   */
  meta?: {
    [k: string]: unknown;
  };

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
  meta?: {
    [k: string]: unknown;
  };

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
  caption?: {
    /**
     * Caption for the attachment, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML caption for the attachment, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

  /**
   * The attachment description.
   */
  description?: {
    /**
     * Description for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML description for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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
  media_details?: {
    [k: string]: unknown;
  };

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
 * Interface for entities from the /wp/v2/types endpoint.
 */
export interface TypeEntity extends Entity {
  /**
   * All capabilities used by the post type.
   */
  capabilities?: {
    [k: string]: unknown;
  };

  /**
   * A human-readable description of the post type.
   */
  description?: string;

  /**
   * Whether or not the post type should have children.
   */
  hierarchical?: boolean;

  /**
   * Whether or not the post type can be viewed.
   */
  viewable?: boolean;

  /**
   * Human-readable labels for the post type for various contexts.
   */
  labels?: {
    [k: string]: unknown;
  };

  /**
   * The title for the post type.
   */
  name?: string;

  /**
   * An alphanumeric identifier for the post type.
   */
  slug?: string;

  /**
   * All features, supported by the post type.
   */
  supports?: {
    [k: string]: unknown;
  };

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
 * Interface for entities from the /wp/v2/taxonomies endpoint.
 */
export interface TaxonomyEntity extends Entity {
  /**
   * All capabilities used by the taxonomy.
   */
  capabilities?: {
    [k: string]: unknown;
  };

  /**
   * A human-readable description of the taxonomy.
   */
  description?: string;

  /**
   * Whether or not the taxonomy should have children.
   */
  hierarchical?: boolean;

  /**
   * Human-readable labels for the taxonomy for various contexts.
   */
  labels?: {
    [k: string]: unknown;
  };

  /**
   * The title for the taxonomy.
   */
  name?: string;

  /**
   * An alphanumeric identifier for the taxonomy.
   */
  slug?: string;

  /**
   * Whether or not the term cloud should be displayed.
   */
  show_cloud?: boolean;

  /**
   * Types associated with the taxonomy.
   */
  types?: string[];

  /**
   * REST base route for the taxonomy.
   */
  rest_base?: string;

  /**
   * The visibility settings for the taxonomy.
   */
  visibility?: {
    /**
     * Whether a taxonomy is intended for use publicly either via the admin interface or by front-end users.
     */
    public?: boolean;

    /**
     * Whether the taxonomy is publicly queryable.
     */
    publicly_queryable?: boolean;

    /**
     * Whether to generate a default UI for managing this taxonomy.
     */
    show_ui?: boolean;

    /**
     * Whether to allow automatic creation of taxonomy columns on associated post-types table.
     */
    show_admin_column?: boolean;

    /**
     * Whether to make the taxonomy available for selection in navigation menus.
     */
    show_in_nav_menus?: boolean;

    /**
     * Whether to show the taxonomy in the quick/bulk edit panel.
     */
    show_in_quick_edit?: boolean;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Interface for terms that belong to a taxonomy.
 *
 * For example:
 * - entities from the /wp/v2/categories endpoint.
 * - entities from the /wp/v2/tags endpoint.
 */
export interface TermEntity extends Entity {
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
  meta?: {
    [k: string]: unknown;
  };
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
   * Login name for the user.
   */
  username?: string;

  /**
   * Display name for the user.
   */
  name?: string;

  /**
   * First name for the user.
   */
  first_name?: string;

  /**
   * Last name for the user.
   */
  last_name?: string;

  /**
   * The email address for the user.
   */
  email?: string;

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
   * Locale for the user.
   */
  locale?: "" | "en_US";

  /**
   * The nickname for the user.
   */
  nickname?: string;

  /**
   * An alphanumeric identifier for the user.
   */
  slug?: string;

  /**
   * Registration date for the user.
   */
  registered_date?: string;

  /**
   * Roles assigned to the user.
   */
  roles?: string[];

  /**
   * Password for the user (never included).
   */
  password?: string;

  /**
   * All capabilities assigned to the user.
   */
  capabilities?: {
    [k: string]: unknown;
  };

  /**
   * Any extra capabilities assigned to the user.
   */
  extra_capabilities?: {
    [k: string]: unknown;
  };

  /**
   * Avatar URLs for the user.
   */
  avatar_urls?: {
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
  };

  /**
   * Meta fields.
   */
  meta?: {
    [k: string]: unknown;
  };
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
   * IP address for the object author.
   */
  author_ip?: string;

  /**
   * Display name for the object author.
   */
  author_name?: string;

  /**
   * URL for the object author.
   */
  author_url?: string;

  /**
   * User agent for the object author.
   */
  author_user_agent?: string;

  /**
   * The content for the object.
   */
  content?: {
    /**
     * Content for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML content for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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
  author_avatar_urls?: {
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
  };

  /**
   * Meta fields.
   */
  meta?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
