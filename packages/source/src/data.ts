import { Merge } from "./utils";

export type EntityData = {
  type: string;
  id: number;
  link: string;
};

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

export type BaseData = {
  isFetching: boolean;
  isReady: boolean;
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
    items: EntityData[];
    total?: number;
    totalPages?: number;
  }
>;

export type TaxonomyData = Merge<
  ArchiveData,
  {
    isTaxonomy: true;
    taxonomy: string;
    id: number;
  }
>;

export type CategoryData = Merge<
  TaxonomyData,
  {
    taxonomy: "category";
    isCategory: true;
  }
>;

export type TagData = Merge<
  TaxonomyData,
  {
    taxonomy: "tag";
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
    year: number;
    month?: number;
    day?: number;
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
    type: "post";
    isPost: true;
  }
>;

export type PageData = Merge<
  PostTypeData,
  {
    type: "page";
    isPage: true;
    isFrontPage?: boolean;
  }
>;

export type AttachmentData = Merge<
  PostTypeData,
  {
    type: "attachment";
    isAttachment: true;
  }
>;
