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
  | AttachmentData
  | ArchiveWithSearchData
  | TaxonomyWithSearchData
  | CategoryWithSearchData
  | TagWithSearchData
  | AuthorWithSearchData
  | PostTypeArchiveWithSearchData
  | PostArchiveWithSearchData
  | DateWithSearchData;

export type BaseData = {
  link?: string;
  type?: string;
  id?: number;
  taxonomy?: string;
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
  isSearch?: false;
  isHome?: boolean;
};

// NOT FOUND

export type NotFoundData = Merge<
  BaseData,
  {
    link: string;
    is404: true;
  }
>;

// ARCHIVES

export type ArchiveData = Merge<
  BaseData,
  {
    link: string;
    isArchive: true;
    items: EntityData[];
    total?: number;
    totalPages?: number;
    isSearch?: false;
    isEmpty: boolean;
  }
>;

export type ArchiveWithSearchData = Merge<
  ArchiveData,
  {
    isSearch: true;
    isEmpty: boolean;
    searchQuery: string;
  }
>;

export type TaxonomyProps = {
  isTaxonomy: true;
  taxonomy: string;
  id: number;
};

export type CategoryProps = {
  taxonomy: "category";
  isCategory: true;
};

export type TagProps = {
  taxonomy: "tag";
  isTag: true;
};

export type AuthorProps = {
  isAuthor: true;
  id: number;
};

export type PostTypeArchiveProps = {
  isPostTypeArchive: true;
  type: string;
};

export type PostArchiveProps = {
  isPostArchive: true;
};

export type DateProps = {
  isDate: true;
  year: number;
  month?: number;
  day?: number;
};

export type TaxonomyData = Merge<ArchiveData, TaxonomyProps>;
export type CategoryData = Merge<TaxonomyData, CategoryProps>;
export type TagData = Merge<TaxonomyData, TagProps>;
export type AuthorData = Merge<ArchiveData, AuthorProps>;
export type PostTypeArchiveData = Merge<ArchiveData, PostTypeArchiveProps>;
export type PostArchiveData = Merge<PostTypeArchiveData, PostArchiveProps>;
export type DateData = Merge<ArchiveData, DateProps>;

export type TaxonomyWithSearchData = Merge<
  ArchiveWithSearchData,
  TaxonomyProps
>;
export type CategoryWithSearchData = Merge<
  TaxonomyWithSearchData,
  CategoryProps
>;
export type TagWithSearchData = Merge<TaxonomyWithSearchData, TagProps>;
export type AuthorWithSearchData = Merge<ArchiveWithSearchData, AuthorProps>;
export type PostTypeArchiveWithSearchData = Merge<
  ArchiveWithSearchData,
  PostTypeArchiveProps
>;
export type PostArchiveWithSearchData = Merge<
  PostTypeArchiveWithSearchData,
  PostArchiveProps
>;
export type DateWithSearchData = Merge<ArchiveWithSearchData, DateProps>;

// POST TYPES

export type PostTypeData = Merge<
  BaseData,
  {
    link: string;
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
  }
>;

export type AttachmentData = Merge<
  PostTypeData,
  {
    type: "attachment";
    isAttachment: true;
  }
>;
