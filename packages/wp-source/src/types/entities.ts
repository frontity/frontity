// ENTITIES

export type Entity = PostType | Attachment | Taxonomy | Author;

export type Href = {
  href: string;
};

export type Embeddable = {
  embeddable: boolean;
};

export type Term = Href &
  Embeddable & {
    taxonomy: string;
  };

export type Links = {
  collection?: Href[];
  self?: Href[];
  about?: Href[];
  curies?: (Href & {
    name?: string;
    templated?: boolean;
  })[];
  author?: (Href & Embeddable)[];
  replies?: (Href & Embeddable)[];
  "wp:post_type"?: Href[];
  "version-history"?: Href[];
  "wp:attachment"?: Href[];
  "wp:contentmedia"?: (Href & Embeddable)[];
  "wp:featuredmedia"?: (Href & Embeddable)[];
  "wp:term"?: Term[];
};

export type Author = {
  type: "author";
  id: number;
  name: string;
  slug: string;
  description: string;
  link: string;
  meta: any;
  url: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  _links?: Links;
};

export type Taxonomy = {
  _links?: Links;
  count?: number;
  description?: string;
  id: number;
  link: string;
  meta?: any;
  name?: string;
  parent?: number;
  slug: string;
  taxonomy: string;
};

export type Embedded = {
  author: Author[];
  "wp:featuredmedia": Attachment[];
  "wp:contentmedia": Attachment[][];
  "wp:term": Taxonomy[];
};

export type Size = {
  file: string;
  height: number;
  mime_type: string; // TODO - set real mime/types
  source_url: string;
  width: number;
};

export type Attachment = {
  _embedded?: Embedded;
  _links: Links;
  alt_text: string;
  author: number;
  caption: string;
  comment_status: "open" | "closed";
  date: string;
  date_gmt: string;
  description: string;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  media_details: {
    file: string;
    height: number;
    image_meta: {
      aperture: string;
      camera: string;
      caption: string;
      copyright: string;
      created_timestamp: string;
      credit: string;
      focal_length: string;
      iso: string;
      keywords: [];
      orientation: string;
      shutter_speed: string;
      title: string;
    };
    sizes: {
      full: Size;
      medium: Size;
      thumbnail: Size;
    };
    width: number;
  };
  media_type: string;
  meta: any;
  mime_type: string;
  modified: string;
  modified_gmt: string;
  ping_status: "closed" | "open";
  post: number;
  slug: string;
  source_url: string;
  title: {
    rendered: string;
  };
  type: "attachment";
  yoast_meta: {
    title: string;
  };
};

export type PostType = {
  type: string;
  id: number;
  link: string;
  author?: number;
  _links?: Links;
  categories?: number[];
  comment_status?: "open" | "closed";
  content?: {
    protected: boolean;
    rendered: string;
  };
  content_media?: number[];
  date?: string;
  date_gmt?: string;
  excerpt?: {
    protected: false;
    rendered: string;
  };
  featured_media?: number;
  guid?: {
    rendered: string;
  };
  format?: string;
  meta?: any;
  modified?: string;
  modified_gmt?: string;
  ping_status?: "open" | "closed";
  slug: string;
  sticky?: boolean;
  tags?: number[];
  title?: {
    rendered: string;
  };
  _embedded?: Embedded;
  [other: string]: any;
};
