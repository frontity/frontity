export type DataMap = {
  [name: string]: Data;
};

export type EntityData = {
  type: string;
  id: number;
  link: string;
};

export type DataPage = EntityData[];

export type Data =
  | FetchingData
  | ArchiveData
  | TaxonomyData
  | CategoryData
  | TagData
  | AuthorData
  | PostTypeArchiveData
  | PostArchiveData
  | DateData
  | PostTypeData
  | NotFoundData;

//  FETCHINGDATA

export type FetchingData = {
  isFetching: boolean;
  isReady?: boolean;
};

// ARCHIVES

export type ArchiveData = FetchingData & {
  isArchive: true;
  page: DataPage[];
};

export type TaxonomyData = ArchiveData & {
  type: string;
  id: number;
  isTaxonomy: true;
};

export type CategoryData = TaxonomyData & {
  isCategory: true;
};

export type TagData = TaxonomyData & {
  isTag: true;
};

export type AuthorData = ArchiveData & {
  id: number;
  isAuthor: true;
};

export type PostTypeArchiveData = ArchiveData & {
  type: string;
  isPostTypeArchive: true;
};

export type PostArchiveData = PostTypeArchiveData & {
  isPostArchive: true;
  isHome: boolean;
  isFrontPage?: boolean;
};

export type DateData = ArchiveData & {
  date: string;
  isDate: true;
};

// POST TYPES

export type PostTypeData = FetchingData & {
  type: string;
  id: number;
  isPostType: true;
  isPost?: boolean;
  isPage?: boolean;
  isFrontPage?: boolean;
  isAttachment?: boolean;
  isMedia?: boolean;
};

// NOT FOUND (OR ERROR)

export type NotFoundData = FetchingData & {
  is404: true;
};
