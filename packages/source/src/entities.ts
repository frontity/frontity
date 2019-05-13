interface BaseEntity {
  id: number;
  slug: string;
  link: string;
  description?: string | { rendered: string };
  meta?: any;
  _links?: any;
}

interface BasePostType extends BaseEntity {
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

export interface Author extends BaseEntity {
  name: string;
  url?: string;
  avatar_urls?: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
  };
}

export interface Taxonomy extends BaseEntity {
  taxonomy: string;
  name?: string;
  parent?: number;
  count?: number;
}

export interface Attachment extends BasePostType {
  source_url?: string;
  caption?: string | { rendered: string };
  alt_text?: string;
  post?: number;
  media_details?: any;
  media_type?: string;
  mime_type?: string;
  // todo: add "media_details"
}

export interface PostType extends BasePostType {
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
