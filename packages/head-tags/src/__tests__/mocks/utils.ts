/* eslint-disable @typescript-eslint/camelcase */
import { State } from "frontity/types";
import {
  CategoryData,
  PostArchiveData,
  PostData,
  AuthorData,
} from "@frontity/source/types/data";
import { HeadTag, Packages } from "../../../types";

/**
 * Return type of {@link mockPostEntity}.
 */
interface MockPostEntityData {
  /**
   * Mocked post.
   */
  post: State<Packages>["source"]["post"];

  /**
   * Mocked data object.
   */
  data: State<Packages>["source"]["data"];
}

/**
 * Returns a mocked post and its data object.
 *
 * @param headTags - Array of {@link HeadTag}.
 * @returns Object of type {@link MockPostEntityData}.
 */
export const mockPostEntity = (headTags?: HeadTag[]): MockPostEntityData => {
  return {
    post: {
      1: {
        id: 1,
        slug: "post-1",
        type: "post",
        link: "https://test.frontity.org/post-1/",
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
        link: "/post-1/",
        route: "/post-1/",
        query: {},
        page: 1,
      } as PostData,
    },
  };
};

/**
 * Return type of {@link mockPostType}.
 */
interface MockPostTypeData {
  /**
   * Mocked post type.
   */
  type: State<Packages>["source"]["type"];

  /**
   * Mocked data object.
   */
  data: State<Packages>["source"]["data"];
}

/**
 * Returns a mocked post type and its data object.
 *
 * @param headTags - Array of {@link HeadTag}.
 * @returns Object of type {@link MockPostTypeData}.
 */
export const mockPostType = (headTags: HeadTag[]): MockPostTypeData => {
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
        link: "/",
        route: "/",
        query: {},
        page: 1,
      } as PostArchiveData,
    },
  };
};

/**
 * Return type of {@link mockTaxonomy}.
 */
interface MockTaxonomyData {
  /**
   * Mocked taxonomy.
   */
  category: State<Packages>["source"]["category"];

  /**
   * Mocked data object.
   */
  data: State<Packages>["source"]["data"];
}

/**
 * Returns a mocked taxonomy and its data object.
 *
 * @param headTags - Array of {@link HeadTag}.
 * @returns Object of type {@link MockTaxonomyData}.
 */
export const mockTaxonomy = (headTags: HeadTag[]): MockTaxonomyData => {
  return {
    category: {
      1: {
        id: 1,
        count: 5,
        link: "https://test.frontity.org/category/cat-1/",
        slug: "cat-1",
        taxonomy: "category",
        parent: 0,
        head_tags: headTags,
      },
    },
    data: {
      "/category/cat-1/": {
        taxonomy: "category",
        id: 1,
        items: [],
        isArchive: true,
        isTerm: true,
        isTaxonomy: true,
        isCategory: true,
        isFetching: false,
        isReady: true,
        link: "/post-1/",
        route: "/post-1/",
        query: {},
        page: 1,
      } as CategoryData,
    },
  };
};

/**
 * Return type of {@link mockAuthor}.
 */
interface MockAuthorData {
  /**
   * Mocked author.
   */
  author: State<Packages>["source"]["author"];

  /**
   * Mocked data object.
   */
  data: State<Packages>["source"]["data"];
}

/**
 * Returns a mocked author and its data object.
 *
 * @param headTags - Array of {@link HeadTag}.
 * @returns Object of type {@link MockAuthorData}.
 */
export const mockAuthor = (headTags: HeadTag[]): MockAuthorData => {
  return {
    author: {
      1: {
        id: 1,
        name: "Author 1",
        link: "https://test.frontity.org/author/author-1/",
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
        link: "/author/author-1/",
        route: "/author/author-1/",
        query: {},
        page: 1,
      } as AuthorData,
    },
  };
};
