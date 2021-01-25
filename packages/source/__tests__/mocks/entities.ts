import {
  PostEntity,
  PageEntity,
  AuthorEntity,
  AttachmentEntity,
  TermEntity,
  TypeEntity,
  TaxonomyEntity,
  CommentEntity,
} from "../../types/entities";

export const author: AuthorEntity = {
  id: 1,
  name: "Some Author",
  url: "https://author.com",
  description: "I am an author",
  link: "https://backend.com/author/luisherranz/",
  slug: "some-author",
  avatar_urls: {
    "24": "https://secure.gravatar.com/avatar/?s=24",
    "48": "https://secure.gravatar.com/avatar/?s=48",
    "96": "https://secure.gravatar.com/avatar/?s=96",
  },
  meta: {},
  _links: {},
};

export const category: TermEntity = {
  id: 2,
  count: 10,
  description: "This is a category",
  link: "https://backend.com/category/some-category/",
  name: "Some Category",
  slug: "some-category",
  taxonomy: "category",
  parent: 0,
  meta: {},
  _links: {},
};

export const tag: TermEntity = {
  id: 3,
  count: 10,
  description: "This is a tag",
  link: "https://backend.com/tag/some-tag/",
  name: "Some Tag",
  slug: "some-tag",
  taxonomy: "tag",
  parent: 0,
  meta: {},
  _links: {},
};

export const post: PostEntity = {
  id: 4,
  date: "1970-01-01T00:00:00",
  date_gmt: "1970-01-01T00:00:00",
  guid: {
    rendered: "https://backend.com/?p=3",
  },
  modified: "1970-01-01T00:00:00",
  modified_gmt: "1970-01-01T00:00:00",
  slug: "some-post",
  status: "publish",
  type: "post",
  link: "https://backend.com/some-post/",
  title: {
    rendered: "Some Post",
  },
  content: {
    rendered: "<p>The content of the post</p>",
    protected: false,
  },
  excerpt: {
    rendered: "<p>The excerpt of the post</p>",
    protected: false,
  },
  author: 1,
  featured_media: 0,
  comment_status: "open",
  ping_status: "open",
  sticky: false,
  format: "standard",
  meta: {},
  categories: [2],
  tags: [3],
  custom_fields: [],
  content_media: [],
  _links: {},
  _embedded: {},
};

export const page: PageEntity = {
  id: 5,
  date: "1970-01-01T00:00:00",
  date_gmt: "1970-01-01T00:00:00",
  guid: {
    rendered: "https://backend.com/?page_id=5",
  },
  modified: "1970-01-01T00:00:00",
  modified_gmt: "1970-01-01T00:00:00",
  slug: "some-page",
  status: "publish",
  type: "page",
  link: "https://backend.com/some-page/",
  title: {
    rendered: "Some Page",
  },
  content: {
    rendered: "<p>The content of the page</p>",
    protected: false,
  },
  excerpt: {
    rendered: "<p>The excerpt of the page</p>",
    protected: false,
  },
  author: 1,
  featured_media: 0,
  parent: 0,
  menu_order: 0,
  comment_status: "closed",
  ping_status: "closed",
  template: "",
  meta: {
    spay_email: "",
  },
  _links: {},
};

export const attachment: AttachmentEntity = {
  id: 4,
  date: "1970-01-01T00:00:00",
  date_gmt: "1970-01-01T00:00:00",
  guid: {
    rendered: "https://backend.com/wp-content/uploads/1970/01/some-image.jpg",
  },
  modified: "1970-01-01T00:00:00",
  modified_gmt: "1970-01-01T00:00:00",
  slug: "some-image",
  status: "publish",
  type: "attachment",
  link: "https://backend.com/some-image/",
  title: {
    rendered: "Some Image",
  },
  author: 1,
  comment_status: "open",
  ping_status: "closed",
  template: "",
  meta: {},
  description: {
    rendered: "The description of the image",
  },
  caption: {
    rendered: "The caption of the image",
  },
  alt_text: "",
  media_type: "image",
  mime_type: "image/jpeg",
  media_details: {
    width: 1200,
    height: 600,
    file: "1970/01/some-image.jpg",
    sizes: {
      thumbnail: {
        file: "some-image-150x150.jpg",
        width: 150,
        height: 150,
        mime_type: "image/jpeg",
        source_url:
          "https://backend.com/wp-content/uploads/1970/01/some-image-150x150.jpg",
      },
      medium: {
        file: "some-image-300x150.jpg",
        width: 300,
        height: 150,
        mime_type: "image/jpeg",
        source_url:
          "https://backend.com/wp-content/uploads/1970/01/some-image-300x150.jpg",
      },
      medium_large: {
        file: "some-image-768x384.jpg",
        width: 768,
        height: 384,
        mime_type: "image/jpeg",
        source_url:
          "https://backend.com/wp-content/uploads/1970/01/some-image-768x384.jpg",
      },
      large: {
        file: "some-image-1024x512.jpg",
        width: 1024,
        height: 512,
        mime_type: "image/jpeg",
        source_url:
          "https://backend.com/wp-content/uploads/1970/01/some-image-1024x512.jpg",
      },
      full: {
        file: "some-image.jpg",
        width: 1200,
        height: 600,
        mime_type: "image/jpeg",
        source_url:
          "https://backend.com/wp-content/uploads/1970/01/some-image.jpg",
      },
    },
    image_meta: {
      aperture: "0",
      credit: "",
      camera: "",
      caption: "",
      created_timestamp: "0",
      copyright: "",
      focal_length: "0",
      iso: "0",
      shutter_speed: "0",
      title: "",
      orientation: "0",
      keywords: [],
    },
  },
  post: null,
  source_url: "https://backend.com/wp-content/uploads/1970/01/some-image.jpg",
  _links: {},
};

export const taxonomy: TaxonomyEntity = {
  name: "Categories",
  slug: "category",
  description: "The post categories",
  types: ["post"],
  hierarchical: true,
  rest_base: "categories",
};

export const postType: TypeEntity = {
  description: "The blog posts",
  hierarchical: false,
  name: "Posts",
  slug: "post",
  taxonomies: ["category", "post_tag"],
  rest_base: "posts",
};

export const comment: CommentEntity = {
  id: 6,
  post: 2,
  parent: 0,
  author: 1,
  author_name: "Some Author",
  author_url: "https://author.com",
  date: "1970-01-01T00:00:00",
  date_gmt: "1970-01-01T00:00:00",
  content: {
    rendered: "This is the comment.",
  },
  link: "https://backend.com/some-post/#comment-6",
  status: "approved",
  type: "comment",
  author_avatar_urls: {
    "24": "https://secure.gravatar.com/avatar/?s=24",
    "48": "https://secure.gravatar.com/avatar/?s=48",
    "96": "https://secure.gravatar.com/avatar/?s=96",
  },
  meta: {},
  _links: {},
};
