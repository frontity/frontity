/* eslint-disable @typescript-eslint/camelcase */
import { HeadTags, State } from "../../../types";

export const mockPostEntity = (
  headTags?: HeadTags
): {
  post: State["source"]["post"];
  data: State["source"]["data"];
} => {
  return {
    post: {
      1: {
        id: 1,
        slug: "post-1",
        type: "post",
        link: "https://test.frontity.io/post-1/",
        author: 1,
        featured_media: 1,
        categories: [],
        tags: [],
        _embedded: {},
        head_tags: headTags,
      },
    },
    data: {
      "/post-1/": {
        type: "post",
        id: 1,
        isPostType: true,
        isPost: true,
        isFetching: false,
        isReady: true,
      },
    },
  };
};

export const mockPostType = (
  headTags: HeadTags
): {
  type: State["source"]["type"];
  data: State["source"]["data"];
} => {
  return {
    type: {
      post: {
        description: "",
        hierarchical: false,
        name: "Posts",
        slug: "post",
        taxonomies: ["category", "tag"],
        rest_base: "posts",
        head_tags: headTags,
      },
    },
    data: {
      "/": {
        type: "post",
        items: [],
        isArchive: true,
        isPostTypeArchive: true,
        isPostArchive: true,
        isHome: true,
        isFetching: false,
        isReady: true,
      },
    },
  };
};

export const mockTaxonomy = (headTags: HeadTags) => {
  return {
    category: {
      1: {
        id: 1,
        count: 5,
        link: "https://test.frontity.io/category/cat-1/",
        slug: "cat-1",
        taxonomy: "category",
        parent: 0,
        head_tags: headTags,
      },
    },
    data: {
      "/category/cat-1/": {
        taxonomy: "category" as "category",
        id: 1,
        items: [],
        isArchive: true as true,
        isTaxonomy: true as true,
        isCategory: true as true,
        isFetching: false as false,
        isReady: true as true,
      },
    },
  };
};

export const mockAuthor = (headTags: HeadTags) => {
  return {
    author: {
      1: {
        id: 1,
        name: "Author 1",
        link: "https://test.frontity.io/author/author-1/",
        slug: "author-1",
        head_tags: headTags,
      },
    },
    data: {
      "/author/author-1/": {
        id: 1,
        items: [],
        isArchive: true as true,
        isAuthor: true as true,
        isFetching: false as false,
        isReady: true as true,
      },
    },
  };
};
