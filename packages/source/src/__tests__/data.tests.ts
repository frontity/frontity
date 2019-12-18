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
  link: "/url/page/2",
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
  next: "/url/page/3",
  previous: "/url",
  page: 2,
  total: 2,
  totalPages: 4,
  isEmpty: false
};

const archiveWithSearch: ArchiveWithSearchData = {
  link: "/url",
  page: 1,
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
  total: 2,
  totalPages: 1,
  isSearch: true,
  isEmpty: false,
  searchQuery: "nature"
};

const taxonomy: TaxonomyData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isTaxonomy: true,
  taxonomy: "taxonomy",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const taxonomyWithSearch: TaxonomyWithSearchData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isTaxonomy: true,
  taxonomy: "taxonomy",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isSearch: true,
  searchQuery: "",
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const category: CategoryData = {
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
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const categoryWithSearch: CategoryWithSearchData = {
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
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature"
};

const tag: TagData = {
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
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const tagWithSearch: TagWithSearchData = {
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
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0
};

const author: AuthorData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const authorWithSearch: AuthorWithSearchData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0
};

const postTypeArchive: PostTypeArchiveData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const postTypeArchiveWithSearch: PostTypeArchiveWithSearchData = {
  link: "/url",
  page: 1,
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0
};

const postArchive: PostArchiveData = {
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
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const postArchiveWithSearch: PostArchiveWithSearchData = {
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
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0
};

const dateArchive: DateData = {
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
  isEmpty: true,
  total: 0,
  totalPages: 0
};

const dateArchiveWithSearch: DateWithSearchData = {
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
  isEmpty: true,
  isSearch: true,
  searchQuery: "nature",
  total: 0,
  totalPages: 0
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
