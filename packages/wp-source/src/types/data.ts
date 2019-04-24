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
  | BaseData
  | NotFoundData
  | ArchiveData
  | TaxonomyData
  | CategoryData
  | TagData
  | AuthorData
  | PostTypeArchiveData
  | PostArchiveData
  | DateData
  | PostTypeData
  | PostData
  | PageData
  | AttachmentData;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type BaseData = {
  isFetching: boolean;
  isReady?: boolean;
  is404?: false;
  isArchive?: false;
  isTaxonomy?: false;
  isCategory?: false;
  isTag?: false;
  isAuthor?: false;
  isPostTypeArchive?: false;
  isPostArchive?: false;
  isDate?: false;
  isPostType?: false;
  isPost?: false;
  isPage?: false;
  isAttachment?: false;
};

// NOT FOUND

export type NotFoundData = Omit<BaseData, "is404"> & {
  is404: true;
};

// ARCHIVES

export type ArchiveData = Omit<BaseData, "isArchive"> & {
  isArchive: true;
  page: DataPage[];
};

export type TaxonomyData = Omit<ArchiveData, "isTaxonomy"> & {
  isTaxonomy: true;
  type: string;
  id: number;
};

export type CategoryData = Omit<TaxonomyData, "isCategory"> & {
  isCategory: true;
};
export type TagData = Omit<TaxonomyData, "isTag"> & {
  isTag: true;
};

export type AuthorData = Omit<ArchiveData, "isAuthor"> & {
  isAuthor: true;
  id: number;
};

export type PostTypeArchiveData = Omit<ArchiveData, "isPostTypeArchive"> & {
  isPostTypeArchive: true;
  type: string;
};

export type PostArchiveData = Omit<PostTypeArchiveData, "isPostArchive"> & {
  isPostArchive: true;
  isHome: boolean;
  isFrontPage?: boolean;
};

export type DateData = Omit<ArchiveData, "isDate"> & {
  isDate: true;
  date: string;
};

// POST TYPES

export type PostTypeData = Omit<BaseData, "isPostType"> & {
  isPostType: true;
  type: string;
  id: number;
};

export type PostData = Omit<PostTypeData, "isPost"> & {
  isPost: true;
};

export type PageData = Omit<PostTypeData, "isPage"> & {
  isPage: true;
  isFrontPage?: boolean;
};

export type AttachmentData = Omit<PostTypeData, "isAttachment"> & {
  isAttachment: true;
};
