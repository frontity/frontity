import {
  Data,
  NotFoundData,
  ArchiveData,
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
  ArchiveWithSearchData,
  TaxonomyWithSearchData,
  CategoryWithSearchData,
  TagWithSearchData,
  AuthorWithSearchData,
  PostTypeArchiveWithSearchData,
  PostArchiveWithSearchData,
  DateWithSearchData
} from "../data";

const notFound: NotFoundData = {
  link: "/not-found",
  is404: true,
  isReady: false,
  isFetching: false
};

const archive: ArchiveData = {
  link: "/url",
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
  isEmpty: false
};

const archiveWithSearch: ArchiveWithSearchData = {
  link: "/url",
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
  isSearch: true,
  isEmpty: false,
  searchQuery: "nature"
};

const taxonomy: TaxonomyData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  taxonomy: "taxonomy",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const taxonomyWithSearch: TaxonomyWithSearchData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  taxonomy: "taxonomy",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "",
  isEmpty: true
};

const category: CategoryData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 2,
  isEmpty: true
};

const categoryWithSearch: CategoryWithSearchData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  isCategory: true,
  taxonomy: "category",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  total: 13,
  totalPages: 2,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const tag: TagData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const tagWithSearch: TagWithSearchData = {
  link: "/url",
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const author: AuthorData = {
  link: "/url",
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const authorWithSearch: AuthorWithSearchData = {
  link: "/url",
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const postTypeArchive: PostTypeArchiveData = {
  link: "/url",
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const postTypeArchiveWithSearch: PostTypeArchiveWithSearchData = {
  link: "/url",
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const postArchive: PostArchiveData = {
  link: "/url",
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const postArchiveWithSearch: PostArchiveWithSearchData = {
  link: "/url",
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const dateArchive: DateData = {
  link: "/url",
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const dateArchiveWithSearch: DateWithSearchData = {
  link: "/url",
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const postType: PostTypeData = {
  link: "/url",
  isPostType: true,
  type: "type",
  id: 60,
  isReady: true,
  isFetching: false
};

const post: PostData = {
  link: "/url",
  isPostType: true,
  isPost: true,
  type: "post",
  id: 60,
  isReady: true,
  isFetching: false
};

const page: PageData = {
  link: "/url",
  isPostType: true,
  isPage: true,
  type: "page",
  id: 11,
  isReady: true,
  isFetching: false
};

const attachment: AttachmentData = {
  link: "/url",
  isPostType: true,
  isAttachment: true,
  type: "attachment",
  id: 123,
  isReady: true,
  isFetching: false
};

const data: Data[] = [
  notFound,
  archive,
  archiveWithSearch,
  taxonomy,
  taxonomyWithSearch,
  category,
  categoryWithSearch,
  tag,
  tagWithSearch,
  author,
  authorWithSearch,
  postTypeArchive,
  postTypeArchiveWithSearch,
  postArchive,
  postArchiveWithSearch,
  dateArchive,
  dateArchiveWithSearch,
  postType,
  post,
  page,
  attachment
];

test("Types are fine!", () => {});
