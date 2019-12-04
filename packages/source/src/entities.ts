/**
 * Define the base structure of entities.
 */
export interface BaseEntity {
  id: number;
  slug: string;
  link: string;
  description?: string | { rendered: string };
  meta?: any;
  _links?: any;
}

/**
 * Define the base structure of post entities.
 * Interfaces that extends from this are:
 * - PostEntity (posts & pages)
 * - AttachmentEntity (images, videos, etc.)
 *
 * @extends BaseEntity
 */
export interface BasePostEntity extends BaseEntity {
  type: string;
  author?: number;
  date?: string;
  date_gmt?: string;
  modified?: string;
  modified_gmt?: string;
  title?: {
    rendered?: string;
  };
  guid?: {
    rendered?: string;
  };
  status?: "publish" | "future" | "draft" | "pending" | "private" | "inherit";
  comment_status?: "open" | "closed";
  ping_status?: "open" | "closed";
  custom_fields?: any;
  template?: string;
  _embedded?: any;
}

/**
 * Define the structure of author entities.
 * @extends BaseEntity
 */
export interface AuthorEntity extends BaseEntity {
  name: string;
  url?: string;
  avatar_urls?: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
  };
}

/**
 * Define the structure of taxonomy entities (specific categories, tags, etc.)
 * @extends BaseEntity
 */
export interface TaxonomyEntity extends BaseEntity {
  taxonomy: string;
  name?: string;
  parent?: number;
  count?: number;
}

/**
 * Define the structure of attachment entities (images, videos, etc.)
 * @extends BasePostEntity
 */
export interface AttachmentEntity extends BasePostEntity {
  source_url?: string;
  caption?: string | { rendered: string };
  alt_text?: string;
  post?: number;
  media_details?: any;
  media_type?: string;
  mime_type?: string;
}

/**
 * Define the structure of post entityes (post & pages)
 * @extends BasePostEntity
 */
export interface PostEntity extends BasePostEntity {
  categories?: number[];
  tags?: number[];
  featured_media?: number;
  excerpt?: {
    protected?: false;
    rendered?: string;
  };
  content?: {
    protected?: boolean;
    rendered?: string;
  };
  content_media?: number[];
  format?: string;
  sticky?: boolean;
}

/**
 * Define the base structure of type entities.
 * Type entities are those that describe the entity types.
 */
export interface BaseType {
  name: string;
  slug: string;
  description: string;
  hierarchical: boolean;
  rest_base: string;
  _links?: any;
}

/**
 * Define the structure of post types.
 * Post types are `"post"`, `"page"`, `"attachment"` and any custom post type.
 * @extends BaseType
 */
export interface PostType extends BaseType {
  taxonomies: string[];
}

/**
 * Define the structure of taxonomy types.
 * Taxonomy types are `"category"`, `"tag"` and any custom taxonomy.
 * @extends BaseType
 */
export interface TaxonomyType extends BaseType {
  types: string[];
}
