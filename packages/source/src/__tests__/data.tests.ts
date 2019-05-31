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
  AttachmentData
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
  totalPages: 13
};

const taxonomy: TaxonomyData = {
  isArchive: true,
  isTaxonomy: true,
  taxonomy: "taxonomy",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false
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
  totalPages: 2
};

const tag: TagData = {
  isArchive: true,
  isTaxonomy: true,
  isTag: true,
  taxonomy: "tag",
  id: 7,
  items: [],
  isReady: true,
  isFetching: false
};

const author: AuthorData = {
  isArchive: true,
  isAuthor: true,
  id: 7,
  items: [],
  isReady: true,
  isFetching: false
};

const postTypeArchive: PostTypeArchiveData = {
  isArchive: true,
  isPostTypeArchive: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false
};

const postArchive: PostArchiveData = {
  isArchive: true,
  isPostTypeArchive: true,
  isPostArchive: true,
  isHome: true,
  isFrontPage: true,
  type: "post",
  items: [],
  isReady: true,
  isFetching: false
};

const dateArchive: DateData = {
  isArchive: true,
  isDate: true,
  year: 2016,
  month: 0,
  day: 31,
  items: [],
  isReady: true,
  isFetching: false
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
  isFrontPage: false,
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
