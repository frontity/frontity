import { expectType } from "../utils";
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
  AttachmentData
} from "../data";

const data: Record<string, Data> = {};

data.onlyStatus = {
  isFetching: true,
  isReady: false
};

data.notFound = {
  is404: true,
  isError: true,
  errorStatus: 404,
  errorStatusText: "Page Not Found",
  isReady: true,
  isFetching: false
};

data.taxonomy = {
  isArchive: true,
  items: [
    {
      id: 60,
      type: "post",
      link: "https://test.frontity.io/2016/the-beauties-of-gullfoss"
    },
    {
      id: 57,
      type: "post",
      link: "https://test.frontity.io/2016/shinjuku-gyoen-national-garden/"
    }
  ],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 13,
  taxonomy: "custom-taxonomy",
  id: 12,
  isTaxonomy: true
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
  total: 13,
  totalPages: 2
};

data.tag = {
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false
};

data.author = {
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false
};

data.postTypeArchive = {
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false
};

data.postArchive = {
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false
};

data.dateArchive = {
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false
};

data.postType = {
  isPostType: true,
  type: "type",
  id: 60,
  isReady: true,
  isFetching: false
};

data.post = {
  isPostType: true,
  isPost: true,
  type: "post",
  id: 60,
  isReady: true,
  isFetching: false
};

data.page = {
  isPostType: true,
  isPage: true,
  type: "page",
  id: 11,
  isReady: true,
  isFetching: false
};

data.attachment = {
  isPostType: true,
  isAttachment: true,
  type: "attachment",
  id: 123,
  isReady: true,
  isFetching: false
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

test("Types are fine!", () => {});
