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
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

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

export type NotFoundData = Merge<
  BaseData,
  {
    is404: true;
  }
>;

// ARCHIVES

export type ArchiveData = Merge<
  BaseData,
  {
    isArchive: true;
    page: DataPage[];
  }
>;

export type TaxonomyData = Merge<
  ArchiveData,
  {
    isTaxonomy: true;
    type: string;
    id: number;
  }
>;

export type CategoryData = Merge<
  TaxonomyData,
  {
    isCategory: true;
  }
>;

export type TagData = Merge<
  TaxonomyData,
  {
    isTag: true;
  }
>;

export type AuthorData = Merge<
  ArchiveData,
  {
    isAuthor: true;
    id: number;
  }
>;

export type PostTypeArchiveData = Merge<
  ArchiveData,
  {
    isPostTypeArchive: true;
    type: string;
  }
>;

export type PostArchiveData = Merge<
  PostTypeArchiveData,
  {
    isPostArchive: true;
    isHome: boolean;
    isFrontPage?: boolean;
  }
>;

export type DateData = Merge<
  ArchiveData,
  {
    isDate: true;
    date: string;
  }
>;

// POST TYPES

export type PostTypeData = Merge<
  BaseData,
  {
    isPostType: true;
    type: string;
    id: number;
  }
>;

export type PostData = Merge<
  PostTypeData,
  {
    isPost: true;
  }
>;

export type PageData = Merge<
  PostTypeData,
  {
    isPage: true;
    isFrontPage?: boolean;
  }
>;

export type AttachmentData = Merge<
  PostTypeData,
  {
    isAttachment: true;
  }
>;
