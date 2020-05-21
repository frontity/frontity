import { expectType } from "frontity/types/helpers";
import {
  Data,
  ErrorData,
  TaxonomyData,
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
  TaxonomyWithSearchData,
  CategoryWithSearchData,
  TagWithSearchData,
  AuthorWithSearchData,
  PostTypeArchiveWithSearchData,
  PostArchiveWithSearchData,
  DateWithSearchData,
} from "../data";

const data: Record<string, Data> = {};

data.onlyStatus = {
  isFetching: true,
  isReady: false,
};

data.notFound = {
  is404: true,
  isError: true,
  errorStatus: 404,
  errorStatusText: "Page Not Found",
  isReady: true,
  isFetching: false,
};

data.taxonomy = {
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
  isTaxonomy: true,
  page: 1,
  path: "/",
};

data.taxonomyWithSearchData = {
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
  isTaxonomy: true,
  page: 1,
  path: "/",
  link: "/url",
  isSearch: true,
  searchQuery: "nature",
};

data.category = {
  isArchive: true,
  isTaxonomy: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
};

data.categoryWithSearchData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isTaxonomy: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
  isSearch: true,
  searchQuery: "nature",
};

data.tag = {
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
};

data.tagWithSearchData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0,
};

data.author = {
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
};

data.authorWithSearchData = {
  link: "/url",
  page: 1,
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
};

data.postTypeArchive = {
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
};

data.postTypeArchiveWithSearchData = {
  link: "/url",
  page: 1,
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
};

data.postArchive = {
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
};

data.postArchiveWithSearchData = {
  link: "/url",
  page: 1,
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
};

data.dateArchive = {
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false,
  total: 0,
  totalPages: 0,
};

data.dateArchiveWithSearchData = {
  link: "/url",
  page: 1,
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
};

data.postType = {
  isPostType: true,
  type: "type",
  id: 60,
  isReady: true,
  isFetching: false,
};

data.post = {
  isPostType: true,
  isPost: true,
  type: "post",
  id: 60,
  isReady: true,
  isFetching: false,
};

data.page = {
  isPostType: true,
  isPage: true,
  type: "page",
  id: 11,
  isReady: true,
  isFetching: false,
};

data.attachment = {
  isPostType: true,
  isAttachment: true,
  type: "attachment",
  id: 123,
  isReady: true,
  isFetching: false,
};

expectType<Data>(data.onlyStatus);
expectType<ErrorData>(data.notFound);
expectType<TaxonomyData>(data.taxonomy);
expectType<CategoryData>(data.category);
expectType<TagData>(data.tag);
expectType<AuthorData>(data.author);
expectType<PostTypeArchiveData>(data.postTypeArchive);
expectType<PostArchiveData>(data.postArchive);
expectType<DateData>(data.dateArchive);
expectType<PostTypeData>(data.postType);
expectType<PostData>(data.post);
expectType<PageData>(data.page);
expectType<AttachmentData>(data.attachment);

expectType<TaxonomyWithSearchData>(data.taxonomyWithSearchData);
expectType<CategoryWithSearchData>(data.categoryWithSearchData);
expectType<TagWithSearchData>(data.tagWithSearchData);
expectType<AuthorWithSearchData>(data.authorWithSearchData);
expectType<PostTypeArchiveWithSearchData>(data.postTypeArchiveWithSearchData);
expectType<CategoryWithSearchData>(data.categoryWithSearchData);
expectType<PostArchiveWithSearchData>(data.postArchiveWithSearchData);
expectType<DateWithSearchData>(data.dateArchiveWithSearchData);

test("Types are fine!", () => {});
