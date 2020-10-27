/* eslint-disable @typescript-eslint/camelcase */

import {
  isPostTypeEntity,
  isPostEntity,
  isPageEntity,
  isAttachmentEntity,
  isCommentEntity,
  isTermEntity,
  isAuthorEntity,
  isTypeEntity,
  isTaxonomyEntity,
} from "../entities";
import {
  PostEntity,
  PageEntity,
  AttachmentEntity,
  CommentEntity,
  TermEntity,
  AuthorEntity,
  TypeEntity,
  TaxonomyEntity,
} from "../../types/entities";

const post: PostEntity = {
  id: 1798,
  date: "2018-11-03T12:20:00",
  date_gmt: "2018-11-03T12:20:00",
  guid: {
    rendered: "https://wpthemetestdata.wordpress.com/?p=1747",
  },
  modified: "2018-11-03T12:20:00",
  modified_gmt: "2018-11-03T12:20:00",
  slug: "block-button",
  status: "publish",
  type: "post",
  link: "https://test.frontity.org/2018/block-button/",
  title: {
    rendered: "Block: Button",
  },
  content: {
    rendered:
      "<p>Button blocks are not semantically <em>buttons</em>, but links inside a styled div. </p>",
    protected: false,
  },
  excerpt: {
    rendered: "<p>Button blocks are not...</p>",
    protected: false,
  },
  author: 6,
  featured_media: 0,
  comment_status: "open",
  ping_status: "open",
  sticky: false,
  format: "standard",
  meta: {},
  categories: [66],
  tags: [],
  custom_fields: [],
  content_media: [],
  _links: {},
  _embedded: {},
};

const page: PageEntity = {
  id: 184,
  date: "2017-03-27T15:09:22",
  date_gmt: "2017-03-27T13:09:22",
  guid: {
    rendered: "http://test.frontity.org/?page_id=184",
  },
  modified: "2019-06-19T14:14:09",
  modified_gmt: "2019-06-19T12:14:09",
  slug: "about-us",
  status: "publish",
  type: "page",
  link: "https://test.frontity.org/about-us/",
  title: {
    rendered: "About us",
  },
  content: {
    rendered:
      "<h5>If you are just curious about our story you&#8217;re in the right spot 🙂</h5>\n",
    protected: false,
  },
  excerpt: {
    rendered: "<p>If you are just curious about our story...</p>",
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

const attachment: AttachmentEntity = {
  id: 437,
  date: "2018-11-23T14:27:38",
  date_gmt: "2018-11-23T12:27:38",
  guid: {
    rendered:
      "https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
  },
  modified: "2018-11-23T14:27:38",
  modified_gmt: "2018-11-23T12:27:38",
  slug: "web3_baby_boy_smile_hat_shutterstock_476144548",
  status: "publish",
  type: "attachment",
  link:
    "https://test.frontity.org/web3_baby_boy_smile_hat_shutterstock_476144548/",
  title: {
    rendered: "web3_baby_boy_smile_hat_shutterstock_476144548",
  },
  author: 2,
  comment_status: "open",
  ping_status: "closed",
  template: "",
  meta: {},
  description: {
    rendered:
      '<p class="attachment"><a href=\'https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg\'><img data-attachment-id="0" data-attachment-id-source="attachment-link-hook"width="300" height="150" src="https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg" class="attachment-medium size-medium" alt="" srcset="https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg 300w, https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-768x384.jpg 768w, https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-1024x512.jpg 1024w, https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg 1200w" sizes="100vw" data-attachment-id="437" data-attachment-id-source="image-attributes-hook" /></a></p>\n',
  },
  caption: {
    rendered: "",
  },
  alt_text: "",
  media_type: "image",
  mime_type: "image/jpeg",
  media_details: {
    width: 1200,
    height: 600,
    file: "2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
    sizes: {
      thumbnail: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548-150x150.jpg",
        width: 150,
        height: 150,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-150x150.jpg",
      },
      full: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
        width: 1200,
        height: 600,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
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
  source_url:
    "https://test.frontity.org/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
  _links: {},
};

const comment: CommentEntity = {
  id: 298,
  post: 2005,
  parent: 0,
  author: 2,
  author_name: "Mario Santos",
  author_url: "",
  date: "2020-09-17T11:18:25",
  date_gmt: "2020-09-17T09:18:25",
  content: {
    rendered: "<p>Hello everyone!</p>\n",
  },
  link:
    "https://test.frontity.org/2015/test-comments/comment-page-1/#comment-298",
  status: "approved",
  type: "comment",
  author_avatar_urls: {
    "24":
      "https://secure.gravatar.com/avatar/a850f5724ad7ea03941081972841a04a?s=24&d=mm&r=g",
    "48":
      "https://secure.gravatar.com/avatar/a850f5724ad7ea03941081972841a04a?s=48&d=mm&r=g",
    "96":
      "https://secure.gravatar.com/avatar/a850f5724ad7ea03941081972841a04a?s=96&d=mm&r=g",
  },
  meta: {},
  _links: {},
};

const category: TermEntity = {
  id: 7,
  count: 10,
  description: "",
  link: "https://test.frontity.org/category/nature/",
  name: "Nature",
  slug: "nature",
  taxonomy: "category",
  parent: 0,
  meta: {},
  _links: {},
};

const author: AuthorEntity = {
  id: 1,
  name: "luisherranz",
  url: "",
  description: "",
  link: "https://test.frontity.org/author/luisherranz/",
  slug: "luisherranz",
  avatar_urls: {
    "24": "https://secure.gravatar.com/avatar/?s=24&d=mm&r=g",
    "48": "https://secure.gravatar.com/avatar/?s=48&d=mm&r=g",
    "96": "https://secure.gravatar.com/avatar/?s=96&d=mm&r=g",
  },
  meta: {},
  _links: {},
};

const taxonomy: TaxonomyEntity = {
  name: "Categories",
  slug: "category",
  description: "",
  types: ["post"],
  hierarchical: true,
  rest_base: "categories",
  _links: {},
};

const type: TypeEntity = {
  description: "",
  hierarchical: false,
  name: "Posts",
  slug: "post",
  taxonomies: ["category", "post_tag"],
  rest_base: "posts",
  _links: {},
};

describe("Entities type guards", () => {
  test("`isPostTypeEntity` should recognize post type entities", () => {
    expect(isPostTypeEntity(post)).toBe(true);
    expect(isPostTypeEntity(page)).toBe(true);
    expect(isPostTypeEntity(attachment)).toBe(true);
    expect(isPostTypeEntity(comment)).toBe(true);
    expect(isPostTypeEntity(category)).toBe(false);
    expect(isPostTypeEntity(author)).toBe(false);
    expect(isPostTypeEntity(taxonomy)).toBe(false);
    expect(isPostTypeEntity(type)).toBe(false);
  });

  test("`isPostEntity` should recognize only post entities", () => {
    expect(isPostEntity(post)).toBe(true);
    expect(isPostEntity(page)).toBe(false);
    expect(isPostEntity(attachment)).toBe(false);
    expect(isPostEntity(comment)).toBe(false);
    expect(isPostEntity(category)).toBe(false);
    expect(isPostEntity(author)).toBe(false);
    expect(isPostEntity(taxonomy)).toBe(false);
    expect(isPostEntity(type)).toBe(false);
  });

  test("`isPageEntity` should recognize only page entities", () => {
    expect(isPageEntity(post)).toBe(false);
    expect(isPageEntity(page)).toBe(true);
    expect(isPageEntity(attachment)).toBe(false);
    expect(isPageEntity(comment)).toBe(false);
    expect(isPageEntity(category)).toBe(false);
    expect(isPageEntity(author)).toBe(false);
    expect(isPageEntity(taxonomy)).toBe(false);
    expect(isPageEntity(type)).toBe(false);
  });

  test("`isAttachmentEntity` should recognize only attachment entities", () => {
    expect(isAttachmentEntity(post)).toBe(false);
    expect(isAttachmentEntity(page)).toBe(false);
    expect(isAttachmentEntity(attachment)).toBe(true);
    expect(isAttachmentEntity(comment)).toBe(false);
    expect(isAttachmentEntity(category)).toBe(false);
    expect(isAttachmentEntity(author)).toBe(false);
    expect(isAttachmentEntity(taxonomy)).toBe(false);
    expect(isAttachmentEntity(type)).toBe(false);
  });

  test("`isCommentEntity` should recognize only comment entities", () => {
    expect(isCommentEntity(post)).toBe(false);
    expect(isCommentEntity(page)).toBe(false);
    expect(isCommentEntity(attachment)).toBe(false);
    expect(isCommentEntity(comment)).toBe(true);
    expect(isCommentEntity(category)).toBe(false);
    expect(isCommentEntity(author)).toBe(false);
    expect(isCommentEntity(taxonomy)).toBe(false);
    expect(isCommentEntity(type)).toBe(false);
  });

  test("`isTermEntity` should recognize term entities", () => {
    expect(isTermEntity(post)).toBe(false);
    expect(isTermEntity(page)).toBe(false);
    expect(isTermEntity(attachment)).toBe(false);
    expect(isTermEntity(comment)).toBe(false);
    expect(isTermEntity(category)).toBe(true);
    expect(isTermEntity(author)).toBe(false);
    expect(isTermEntity(taxonomy)).toBe(false);
    expect(isTermEntity(type)).toBe(false);
  });

  test("`isAuthorEntity` should recognize author entities", () => {
    expect(isAuthorEntity(post)).toBe(false);
    expect(isAuthorEntity(page)).toBe(false);
    expect(isAuthorEntity(attachment)).toBe(false);
    expect(isAuthorEntity(comment)).toBe(false);
    expect(isAuthorEntity(category)).toBe(false);
    expect(isAuthorEntity(author)).toBe(true);
    expect(isAuthorEntity(taxonomy)).toBe(false);
    expect(isAuthorEntity(type)).toBe(false);
  });

  test("`isTaxonomyEntity` should recognize taxonomy entities", () => {
    expect(isTaxonomyEntity(post)).toBe(false);
    expect(isTaxonomyEntity(page)).toBe(false);
    expect(isTaxonomyEntity(attachment)).toBe(false);
    expect(isTaxonomyEntity(comment)).toBe(false);
    expect(isTaxonomyEntity(category)).toBe(false);
    expect(isTaxonomyEntity(author)).toBe(false);
    expect(isTaxonomyEntity(taxonomy)).toBe(true);
    expect(isTaxonomyEntity(type)).toBe(false);
  });

  test("`isTypeEntity` should recognize type entities", () => {
    expect(isTypeEntity(post)).toBe(false);
    expect(isTypeEntity(page)).toBe(false);
    expect(isTypeEntity(attachment)).toBe(false);
    expect(isTypeEntity(comment)).toBe(false);
    expect(isTypeEntity(category)).toBe(false);
    expect(isTypeEntity(author)).toBe(false);
    expect(isTypeEntity(taxonomy)).toBe(false);
    expect(isTypeEntity(type)).toBe(true);
  });
});
