import { expectType } from "frontity/types/helpers";
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
  AttachmentData,
  TaxonomyWithSearchData,
  CategoryWithSearchData,
  TagWithSearchData,
  AuthorWithSearchData,
  PostTypeArchiveWithSearchData,
  PostArchiveWithSearchData,
  DateWithSearchData,
} from "../data";

const data = {} as Data;

if (data.isError) {
  expectType<ErrorData>(data);
}

if (data.isArchive) {
  expectType<
    | TaxonomyData
    | AuthorData
    | PostTypeArchiveData
    | DateData
    | TaxonomyWithSearchData
    | CategoryWithSearchData
    | TagWithSearchData
    | AuthorWithSearchData
    | PostTypeArchiveWithSearchData
    | PostArchiveWithSearchData
    | DateWithSearchData
  >(data);
}

if (data.isTaxonomy) {
  expectType<TaxonomyData | TaxonomyWithSearchData>(data);
  if (data.isSearch) expectType<TaxonomyWithSearchData>(data);
}

if (data.isCategory) {
  expectType<TaxonomyData | TaxonomyWithSearchData>(data);
  expectType<CategoryData | CategoryWithSearchData>(data);
  if (data.isSearch) expectType<CategoryWithSearchData>(data);
}

if (data.isTag) {
  expectType<TaxonomyData | TaxonomyWithSearchData>(data);
  expectType<TagData | TagWithSearchData>(data);
  if (data.isSearch) expectType<TagWithSearchData>(data);
}

if (data.isAuthor) {
  expectType<AuthorData | AuthorWithSearchData>(data);
  if (data.isSearch) expectType<AuthorWithSearchData>(data);
}

if (data.isPostTypeArchive) {
  expectType<PostTypeArchiveData | PostTypeArchiveWithSearchData>(data);
  if (data.isSearch) expectType<PostTypeArchiveWithSearchData>(data);
}

if (data.isPostArchive) {
  expectType<PostArchiveData | PostArchiveWithSearchData>(data);
  if (data.isSearch) expectType<PostArchiveWithSearchData>(data);
}

if (data.isDate) {
  expectType<DateData | DateWithSearchData>(data);
  if (data.isSearch) expectType<DateWithSearchData>(data);
}

if (data.isPostType) {
  expectType<PostTypeData>(data);
}

if (data.isPost) {
  expectType<PostTypeData>(data);
  expectType<PostData>(data);
}

if (data.isPage) {
  expectType<PostTypeData>(data);
  expectType<PageData>(data);
}

if (data.isAttachment) {
  expectType<PostTypeData>(data);
  expectType<AttachmentData>(data);
}

test("Types are fine!", () => {});
