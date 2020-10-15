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
 * Interface for entities from the /wp/v2/posts endpoint.
 */
export interface Post extends Entity {
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
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * URL to the object.
   */
  link?: string;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;

  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";

  /**
   * Type of Post for the object.
   */
  type?: string;

  /**
   * A password to protect access to the content and excerpt.
   */
  password?: string;

  /**
   * Permalink template for the object.
   */
  permalink_template?: string;

  /**
   * Slug automatically generated from the object title.
   */
  generated_slug?: string;

  /**
   * The title for the object.
   */
  title?: {
    /**
     * Title for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML title for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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

    /**
     * Version of the content block format used by the object.
     */
    block_version?: number;

    /**
     * Whether the content is protected with a password.
     */
    protected?: boolean;
    [k: string]: unknown;
  };

  /**
   * The ID for the author of the object.
   */
  author?: number;

  /**
   * The excerpt for the object.
   */
  excerpt?: {
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
  };

  /**
   * The ID of the featured media for the object.
   */
  featured_media?: number;

  /**
   * Whether or not comments are open on the object.
   */
  comment_status?: "open" | "closed";

  /**
   * Whether or not the object can be pinged.
   */
  ping_status?: "open" | "closed";

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
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/posts/1/revisions endpoint.
 */
export interface PostRevision extends Entity {
  /**
   * The ID for the author of the object.
   */
  author?: number;

  /**
   * The date the object was published, in the site's timezone.
   */
  date?: string;

  /**
   * The date the object was published, as GMT.
   */
  date_gmt?: string;

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
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * The ID for the parent of the object.
   */
  parent?: number;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;

  /**
   * The title for the object.
   */
  title?: {
    /**
     * Title for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML title for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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

    /**
     * Version of the content block format used by the object.
     */
    block_version?: number;

    /**
     * Whether the content is protected with a password.
     */
    protected?: boolean;
    [k: string]: unknown;
  };

  /**
   * The excerpt for the object.
   */
  excerpt?: {
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
  };
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/pages endpoint.
 */
export interface Page extends Entity {
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
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * URL to the object.
   */
  link?: string;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;

  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";

  /**
   * Type of Post for the object.
   */
  type?: string;

  /**
   * A password to protect access to the content and excerpt.
   */
  password?: string;

  /**
   * Permalink template for the object.
   */
  permalink_template?: string;

  /**
   * Slug automatically generated from the object title.
   */
  generated_slug?: string;

  /**
   * The ID for the parent of the object.
   */
  parent?: number;

  /**
   * The title for the object.
   */
  title?: {
    /**
     * Title for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML title for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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

    /**
     * Version of the content block format used by the object.
     */
    block_version?: number;

    /**
     * Whether the content is protected with a password.
     */
    protected?: boolean;
    [k: string]: unknown;
  };

  /**
   * The ID for the author of the object.
   */
  author?: number;

  /**
   * The excerpt for the object.
   */
  excerpt?: {
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
  };

  /**
   * The ID of the featured media for the object.
   */
  featured_media?: number;

  /**
   * Whether or not comments are open on the object.
   */
  comment_status?: "open" | "closed";

  /**
   * Whether or not the object can be pinged.
   */
  ping_status?: "open" | "closed";

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
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/media endpoint.
 */
export interface Attachment extends Entity {
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
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * URL to the object.
   */
  link?: string;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;

  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";

  /**
   * Type of Post for the object.
   */
  type?: string;

  /**
   * Permalink template for the object.
   */
  permalink_template?: string;

  /**
   * Slug automatically generated from the object title.
   */
  generated_slug?: string;

  /**
   * The title for the object.
   */
  title?: {
    /**
     * Title for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * HTML title for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };

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
 * Interface for entities from the /wp/v2/blocks endpoint.
 */
export interface WpBlock extends Entity {
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
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * URL to the object.
   */
  link?: string;

  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;

  /**
   * The date the object was last modified, as GMT.
   */
  modified_gmt?: string;

  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;

  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";

  /**
   * Type of Post for the object.
   */
  type?: string;

  /**
   * A password to protect access to the content and excerpt.
   */
  password?: string;

  /**
   * The title for the object.
   */
  title?: {
    /**
     * Title for the object, as it exists in the database.
     */
    raw?: string;
    [k: string]: unknown;
  };

  /**
   * The content for the object.
   */
  content?: {
    /**
     * Content for the object, as it exists in the database.
     */
    raw?: string;

    /**
     * Version of the content block format used by the object.
     */
    block_version?: number;

    /**
     * Whether the content is protected with a password.
     */
    protected?: boolean;
    [k: string]: unknown;
  };

  /**
   * The theme file to use to display the object.
   */
  template?: string;
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/types endpoint.
 */
export interface Type extends Entity {
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
export interface Taxonomy extends Entity {
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
 * Interface for entities from the /wp/v2/categories endpoint.
 */
export interface Category extends Entity {
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
  taxonomy?:
    | "category"
    | "post_tag"
    | "nav_menu"
    | "link_category"
    | "post_format";

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
 * Interface for entities from the /wp/v2/tags endpoint.
 */
export interface Tag extends Entity {
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
  taxonomy?:
    | "category"
    | "post_tag"
    | "nav_menu"
    | "link_category"
    | "post_format";

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
export interface User extends Entity {
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
export interface Comment extends Entity {
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

/**
 * Interface for entities from the /wp/v2/search endpoint.
 */
export interface SearchResult extends Entity {
  /**
   * Unique identifier for the object.
   */
  id?: number;

  /**
   * The title for the object.
   */
  title?: string;

  /**
   * URL to the object.
   */
  url?: string;

  /**
   * Object type.
   */
  type?: "post";

  /**
   * Object subtype.
   */
  subtype?: "post" | "page";
  [k: string]: unknown;
}

/**
 * Interface for entities from the /wp/v2/block-types endpoint.
 */
export interface BlockType extends Entity {
  /**
   * Title of block type.
   */
  title?: string;

  /**
   * Unique name identifying the block type.
   */
  name?: string;

  /**
   * Description of block type.
   */
  description?: string;

  /**
   * Icon of block type.
   */
  icon?: string | null;

  /**
   * Block attributes.
   */
  attributes?: {
    [k: string]: {
      [k: string]: unknown;
    };
  } | null;

  /**
   * Context provided by blocks of this type.
   */
  provides_context?: {
    [k: string]: string;
  };

  /**
   * Context values inherited by blocks of this type.
   */
  uses_context?: string[];

  /**
   * Block supports.
   */
  supports?: {
    [k: string]: unknown;
  };

  /**
   * Block category.
   */
  category?: string | null;

  /**
   * Is the block dynamically rendered.
   */
  is_dynamic?: boolean;

  /**
   * Editor script handle.
   */
  editor_script?: string | null;

  /**
   * Public facing script handle.
   */
  script?: string | null;

  /**
   * Editor style handle.
   */
  editor_style?: string | null;

  /**
   * Public facing style handle.
   */
  style?: string | null;

  /**
   * Block style variations.
   */
  styles?: {
    /**
     * Unique name identifying the style.
     */
    name?: string;

    /**
     * The human-readable label for the style.
     */
    label?: string;

    /**
     * Inline CSS code that registers the CSS class required for the style.
     */
    inline_style?: string;

    /**
     * Contains the handle that defines the block style.
     */
    style_handle?: string;
    [k: string]: unknown;
  }[];

  /**
   * Public text domain.
   */
  textdomain?: string | null;

  /**
   * Parent blocks.
   */
  parent?: string[] | null;

  /**
   * Block keywords.
   */
  keywords?: string[];

  /**
   * Block example.
   */
  example?: {
    /**
     * The attributes used in the example.
     */
    attributes?: {
      [k: string]: unknown;
    };

    /**
     * The list of inner blocks used in the example.
     */
    innerBlocks?: {
      /**
       * The name of the inner block.
       */
      name?: string;

      /**
       * The attributes of the inner block.
       */
      attributes?: {
        [k: string]: unknown;
      };

      /**
       * A list of the inner block's own inner blocks. This is a recursive definition following the parent innerBlocks schema.
       */
      innerBlocks?: unknown[];
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}
