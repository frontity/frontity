/* eslint-disable @typescript-eslint/camelcase */
import {
  TaxonomyType,
  TaxonomyEntity,
  PostType,
  PostEntity,
  AuthorEntity,
  AttachmentEntity
} from "../entities";

const author: AuthorEntity = {
  id: 1,
  name: "luisherranz",
  url: "",
  description: "",
  link: "https://test.frontity.io/author/luisherranz/",
  slug: "luisherranz",
  avatar_urls: {
    "24": "https://secure.gravatar.com/avatar/?s=24&d=mm&r=g",
    "48": "https://secure.gravatar.com/avatar/?s=48&d=mm&r=g",
    "96": "https://secure.gravatar.com/avatar/?s=96&d=mm&r=g"
  },
  meta: [],
  _links: {
    self: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/users/1"
      }
    ],
    collection: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/users"
      }
    ]
  }
};

const taxonomy: TaxonomyEntity = {
  id: 7,
  count: 10,
  description: "",
  link: "https://test.frontity.io/category/nature/",
  name: "Nature",
  slug: "nature",
  taxonomy: "category",
  parent: 0,
  meta: [],
  _links: {
    self: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/categories/7"
      }
    ],
    collection: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/categories"
      }
    ],
    about: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/taxonomies/category"
      }
    ],
    "wp:post_type": [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/posts?categories=7"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  }
};

const post: PostEntity = {
  id: 1798,
  date: "2018-11-03T12:20:00",
  date_gmt: "2018-11-03T12:20:00",
  guid: {
    rendered: "https://wpthemetestdata.wordpress.com/?p=1747"
  },
  modified: "2018-11-03T12:20:00",
  modified_gmt: "2018-11-03T12:20:00",
  slug: "block-button",
  status: "publish",
  type: "post",
  link: "https://test.frontity.io/2018/block-button/",
  title: {
    rendered: "Block: Button"
  },
  content: {
    rendered:
      ' <p>Button blocks are not semantically <em>buttons</em>, but links inside a styled div. </p>   <p style="text-align:left;">If you do not add a link, a link tag without an anchor will be used.</p>   <div class="wp-block-button alignleft"><a class="wp-block-button__link">Left aligned</a></div>   <p>Check to make sure that the text wraps correctly when the button has more than one line of text, and when it is extra long.</p>   <div class="wp-block-button aligncenter"><a class="wp-block-button__link">A centered button with more than one line of text</a></div>   <p>Buttons have three styles: </p>   <div class="wp-block-button"><a class="wp-block-button__link">Rounded</a></div>   <div class="wp-block-button is-style-outline"><a class="wp-block-button__link">Outline</a></div>   <div class="wp-block-button is-style-squared"><a class="wp-block-button__link">Square</a></div>   <p>If the theme has a custom color palette, test that background color and text color settings work correctly. </p>   <div class="wp-block-button"><a class="wp-block-button__link" href="https://wordpress.org/gutenberg/handbook/extensibility/theme-support/#block-color-palette">Read more about the color palettes in the handbook.</a></div>   <p>Now lets test how buttons display together with large texts.</p>   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec mollis. Quisque convallis libero in sapien pharetra tincidunt. Aliquam elit ante, malesuada id, tempor eu, gravida id, odio. </p>   <div class="wp-block-button alignright"><a class="wp-block-button__link">Right aligned</a></div>   <p>Maecenas suscipit, risus et eleifend imperdiet, nisi orci ullamcorper massa, et adipiscing orci velit quis magna. Praesent sit amet ligula id orci venenatis auctor. Phasellus porttitor, metus non tincidunt dapibus, orci pede pretium neque, sit amet adipiscing ipsum lectus et libero. Aenean bibendum. Curabitur mattis quam id urna. </p>   <div class="wp-block-button alignleft"><a class="wp-block-button__link">Left aligned</a></div>   <p>Vivamus dui. Donec nonummy lacinia lorem. Cras risus arcu, sodales ac, ultrices ac, mollis quis, justo. Sed a libero. Quisque risus erat, posuere at, tristique non, lacinia quis, eros.</p>  <a>aaa</a>',
    protected: false
  },
  excerpt: {
    rendered:
      '<p>Button blocks are not semantically buttons, but links inside a styled div.&nbsp; If you do not add a link, a link tag without an anchor will be used. Left aligned Check to make sure that the text wraps correctly when the button has more than one line of text, and when it is extra long. &hellip; </p>\n<p class="link-more"><a href="https://test.frontity.io/2018/block-button/" class="more-link">Continue reading<span class="screen-reader-text"> &#8220;Block: Button&#8221;</span></a></p>\n',
    protected: false
  },
  author: 6,
  featured_media: 0,
  comment_status: "open",
  ping_status: "open",
  sticky: false,
  format: "standard",
  meta: [],
  categories: [66],
  tags: [],
  custom_fields: [],
  content_media: [],
  _links: {
    self: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/posts/1798"
      }
    ],
    collection: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/posts"
      }
    ],
    about: [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/types/post"
      }
    ],
    author: [
      {
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/users/6"
      }
    ],
    replies: [
      {
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/comments?post=1798"
      }
    ],
    "version-history": [
      {
        count: 0,
        href: "https://test.frontity.io/wp-json/wp/v2/posts/1798/revisions"
      }
    ],
    "wp:attachment": [
      {
        href: "https://test.frontity.io/wp-json/wp/v2/media?parent=1798"
      }
    ],
    "wp:term": [
      {
        taxonomy: "category",
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/categories?post=1798"
      },
      {
        taxonomy: "post_tag",
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/tags?post=1798"
      },
      {
        taxonomy: "latest",
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/latest?post=1798"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  },
  _embedded: {}
};

const attachment: AttachmentEntity = {
  id: 437,
  date: "2018-11-23T14:27:38",
  date_gmt: "2018-11-23T12:27:38",
  guid: {
    rendered:
      "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg"
  },
  modified: "2018-11-23T14:27:38",
  modified_gmt: "2018-11-23T12:27:38",
  slug: "web3_baby_boy_smile_hat_shutterstock_476144548",
  status: "inherit",
  type: "attachment",
  link:
    "https://test.frontity.io/web3_baby_boy_smile_hat_shutterstock_476144548/",
  title: {
    rendered: "web3_baby_boy_smile_hat_shutterstock_476144548"
  },
  author: 2,
  comment_status: "open",
  ping_status: "closed",
  template: "",
  meta: [],
  description: {
    rendered:
      '<p class="attachment"><a href=\'https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg\'><img data-attachment-id="0" data-attachment-id-source="attachment-link-hook"width="300" height="150" src="https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg" class="attachment-medium size-medium" alt="" srcset="https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg 300w, https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-768x384.jpg 768w, https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-1024x512.jpg 1024w, https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg 1200w" sizes="100vw" data-attachment-id="437" data-attachment-id-source="image-attributes-hook" /></a></p>\n'
  },
  caption: {
    rendered: ""
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
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-150x150.jpg"
      },
      medium: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg",
        width: 300,
        height: 150,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-300x150.jpg"
      },
      medium_large: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548-768x384.jpg",
        width: 768,
        height: 384,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-768x384.jpg"
      },
      large: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548-1024x512.jpg",
        width: 1024,
        height: 512,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-1024x512.jpg"
      },
      "twentyseventeen-thumbnail-avatar": {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548-100x100.jpg",
        width: 100,
        height: 100,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548-100x100.jpg"
      },
      full: {
        file: "web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
        width: 1200,
        height: 600,
        mime_type: "image/jpeg",
        source_url:
          "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg"
      }
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
      keywords: []
    }
  },
  post: null,
  source_url:
    "https://test.frontity.io/wp-content/uploads/2018/11/web3_baby_boy_smile_hat_shutterstock_476144548.jpg",
  _links: {
    self: [
      {
        attributes: [],
        href: "https://test.frontity.io/wp-json/wp/v2/media/437"
      }
    ],
    collection: [
      {
        attributes: [],
        href: "https://test.frontity.io/wp-json/wp/v2/media"
      }
    ],
    about: [
      {
        attributes: [],
        href: "https://test.frontity.io/wp-json/wp/v2/types/attachment"
      }
    ],
    author: [
      {
        attributes: {
          embeddable: true
        },
        href: "https://test.frontity.io/wp-json/wp/v2/users/2"
      }
    ],
    replies: [
      {
        attributes: {
          embeddable: true
        },
        href: "https://test.frontity.io/wp-json/wp/v2/comments?post=437"
      }
    ],
    "wp:term": [
      {
        attributes: {
          taxonomy: "latest",
          embeddable: true
        },
        href: "https://test.frontity.io/wp-json/wp/v2/latest?attachment=437"
      },
      {
        taxonomy: "latest",
        embeddable: true,
        href: "https://test.frontity.io/wp-json/wp/v2/latest?attachment=437"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  }
};

const taxonomyType: TaxonomyType = {
  name: "Categories",
  slug: "category",
  description: "",
  types: ["post"],
  hierarchical: true,
  rest_base: "categories",
  _links: {
    collection: [
      {
        href: "http://test.frontity.io/wp-json/wp/v2/types"
      }
    ],
    "wp:items": [
      {
        href: "http://test.frontity.io/wp-json/wp/v2/posts"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  }
};

const postType: PostType = {
  description: "",
  hierarchical: false,
  name: "Posts",
  slug: "post",
  taxonomies: ["category", "post_tag"],
  rest_base: "posts",
  _links: {
    collection: [
      {
        href: "http://test.frontity.io/wp-json/wp/v2/types"
      }
    ],
    "wp:items": [
      {
        href: "http://test.frontity.io/wp-json/wp/v2/posts"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  }
};

test("Types are fine!", () => {});
