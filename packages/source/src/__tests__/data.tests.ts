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
  is404: true,
  isReady: false,
  isFetching: false
};

const archive: ArchiveData = {
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
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const authorWithSearch: AuthorWithSearchData = {
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
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false,
  isEmpty: true
};

const postTypeArchiveWithSearch: PostTypeArchiveWithSearchData = {
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
  isPostType: true,
  type: "type",
  id: 60,
  isReady: true,
  isFetching: false
};

const post: PostData = {
  isPostType: true,
  isPost: true,
  type: "post",
  id: 60,
  isReady: true,
  isFetching: false
};

const page: PageData = {
  isPostType: true,
  isPage: true,
  type: "page",
  id: 11,
  isReady: true,
  isFetching: false
};

const attachment: AttachmentData = {
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
  taxonomy,
  category,
  tag,
  author,
  postTypeArchive,
  postArchive,
  dateArchive,
  postType,
  post,
  page,
  attachment
];

test("Types are fine!", () => {});
