import {
  Data,
  ErrorData,
  TaxonomyData,
  TermData,
  CategoryData,
  TagData,
  AuthorData,
  PostTypeArchiveData,
  PostArchiveData,
  DateData,
  PostTypeData,
  PostData,
  PageData,
  AttachmentData,
  SearchData,
  HomeData,
  RedirectionData,
} from "../../types/data";

export const onlyStatus: Data = {
  isFetching: true,
  isReady: false,
  link: "",
  route: "",
  page: 1,
  query: {},
};

export const notFound: ErrorData = {
  is404: true,
  isError: true,
  errorStatus: 404,
  errorStatusText: "Page Not Found",
  isReady: true,
  isFetching: false,
  link: "/this-page-does-not-exist",
  route: "/this-page-does-not-exist",
  page: 1,
  query: {},
};

export const oldTaxonomy: TaxonomyData = {
  isArchive: true,
  items: [
    {
      id: 60,
      type: "post",
      link: "https://test.frontity.org/2016/the-beauties-of-gullfoss",
    },
    {
      id: 57,
      type: "post",
      link: "https://test.frontity.org/2016/shinjuku-gyoen-national-garden/",
    },
  ],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 13,
  taxonomy: "custom-taxonomy",
  id: 12,
  isTaxonomy: true, // It only has the deprecated value.
  page: 1,
  route: "/custom-taxonomy/nature/",
  link: "/custom-taxonomy/nature/",
  query: {},
} as TaxonomyData;

export const term: TermData = {
  isArchive: true,
  items: [
    {
      id: 60,
      type: "post",
      link: "https://test.frontity.org/2016/the-beauties-of-gullfoss",
    },
    {
      id: 57,
      type: "post",
      link: "https://test.frontity.org/2016/shinjuku-gyoen-national-garden/",
    },
  ],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 13,
  taxonomy: "custom-taxonomy",
  id: 12,
  isTaxonomy: true, // This values is deprecated.
  isTerm: true,
  page: 1,
  route: "/custom-taxonomy/nature/",
  link: "/custom-taxonomy/nature/",
  query: {},
};

export const termWithSearchData: TermData & SearchData = {
  isArchive: true,
  items: [
    {
      id: 60,
      type: "post",
      link: "https://test.frontity.org/2016/the-beauties-of-gullfoss",
    },
    {
      id: 57,
      type: "post",
      link: "https://test.frontity.org/2016/shinjuku-gyoen-national-garden/",
    },
  ],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 13,
  taxonomy: "custom-taxonomy",
  id: 12,
  isTaxonomy: true, // This values is deprecated.
  isTerm: true,
  page: 1,
  route: "/custom-taxonomy/nature/",
  link: "/custom-taxonomy/nature/?s=nature",
  query: { s: "nature" },
  isSearch: true,
  searchQuery: "nature",
};

export const category: CategoryData = {
  isArchive: true,
  isTaxonomy: true, // This value is deprecated.
  isTerm: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/category/nature/",
  link: "/category/nature/",
  query: {},
};

export const categoryWithSearchData: CategoryData & SearchData = {
  isArchive: true,
  isTaxonomy: true, // This values is deprecated.
  isTerm: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/category/nature/",
  link: "/category/nature/?s=gullfoss",
  query: { s: "gullfoss" },
  isSearch: true,
  searchQuery: "gullfoss",
};

export const tag: TagData = {
  isArchive: true,
  isTaxonomy: true, // This values is deprecated.
  isTerm: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/tag/japan/",
  link: "/tag/japan/",
  query: {},
};

export const tagWithSearchData: TagData & SearchData = {
  isArchive: true,
  isTaxonomy: true, // This values is deprecated.
  isTerm: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "shinjuku",
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/tag/japan/",
  link: "/tag/japan/?s=shinjuku",
  query: { s: "shinjuku" },
};

export const author: AuthorData = {
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/author/mario/",
  link: "/author/mario/",
  query: {},
};

export const authorWithSearchData: AuthorData & SearchData = {
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/author/mario/",
  link: "/author/mario/?s=nature",
  query: { s: "nature" },
};

export const postTypeArchive: PostTypeArchiveData = {
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/movies/",
  link: "/movies/",
  query: {},
};

export const postTypeArchiveWithSearchData: PostTypeArchiveData & SearchData = {
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/movies/",
  link: "/movies/?s=nature",
  query: { s: "nature" },
};

export const postArchive: PostArchiveData & HomeData = {
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/",
  link: "/",
  query: {},
};

export const postArchiveWithSearchData: PostArchiveData &
  HomeData &
  SearchData = {
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/",
  link: "/?s=nature",
  query: { s: "nature" },
};

export const dateArchive: DateData = {
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 3,
  day: 24,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/2016/03/24/",
  link: "/2016/03/24/",
  query: {},
};

export const dateArchiveWithSearchData: DateData & SearchData = {
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0,
  page: 1,
  route: "/2016/03/24/",
  link: "/2016/03/24/?s=nature",
  query: { s: "nature" },
};

export const postType: PostTypeData = {
  isPostType: true,
  type: "movie",
  id: 60,
  isReady: true,
  isFetching: false,
  link: "/movie/the-terminator/",
  route: "/movie/the-terminator/",
  page: 1,
  query: {},
};

export const post: PostData = {
  isPostType: true,
  isPost: true,
  type: "post",
  id: 60,
  isReady: true,
  isFetching: false,
  link: "/the-beauties-of-gullfoss/",
  route: "/the-beauties-of-gullfoss/",
  page: 1,
  query: {},
};

export const page: PageData = {
  isPostType: true,
  isPage: true,
  type: "page",
  id: 11,
  isReady: true,
  isFetching: false,
  link: "/about-us/",
  route: "/about-us/",
  page: 1,
  query: {},
};

export const attachment: AttachmentData = {
  isPostType: true,
  isAttachment: true,
  type: "attachment",
  id: 123,
  isReady: true,
  isFetching: false,
  link: "/the-beauties-of-gullfoss/gullfoss/",
  route: "/the-beauties-of-gullfoss/gullfoss/",
  page: 1,
  query: {},
};

export const redirection: RedirectionData = {
  link: "/example/",
  query: {},
  route: "/example/",
  page: 1,
  isRedirection: true,
  isExternal: false,
  location: "http://example.com/example",
  redirectionStatus: 301,
  is301: true,
  isFetching: false,
  isReady: true,
};
