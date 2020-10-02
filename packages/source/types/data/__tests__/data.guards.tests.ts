import { expectType } from "frontity/types/helpers";
import {
  // Types.
  Data,
  ErrorData,
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
  TaxonomyWithSearchData,
  CategoryWithSearchData,
  TagWithSearchData,
  AuthorWithSearchData,
  PostTypeArchiveWithSearchData,
  PostArchiveWithSearchData,
  DateWithSearchData,
  // Guards.
  isError,
  isArchive,
  isSearch,
  isTaxonomy,
  isCategory,
  isTag,
  isAuthor,
  isDate,
  isPostTypeArchive,
  isPostArchive,
  isPostType,
  isPost,
  isPage,
  isAttachment,
} from "../";

const data = {} as Data;

if (isError(data)) {
  expectType<Data>(data);
  expectType<ErrorData>(data);
}

if (isArchive(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
}

if (isTaxonomy(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<TaxonomyData>(data);
}

// Type composition nesting other checks.
if (isTaxonomy(data)) {
  if (isSearch(data)) {
    expectType<Data>(data);
    expectType<ArchiveData>(data);
    expectType<TaxonomyData>(data);
    expectType<TaxonomyWithSearchData>(data);
  }
}

// Types can be composited in the same condition.
if (isTaxonomy(data) && isSearch(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<TaxonomyData>(data);
  expectType<TaxonomyWithSearchData>(data);
}

if (isCategory(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<TaxonomyData>(data);
  expectType<CategoryData>(data);
  if (isSearch(data)) expectType<CategoryWithSearchData>(data);
}

if (isTag(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<TaxonomyData>(data);
  expectType<TagData>(data);
  if (isSearch(data)) expectType<TagWithSearchData>(data);
}

if (isAuthor(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<AuthorData>(data);
  if (isSearch(data)) expectType<AuthorWithSearchData>(data);
}

if (isPostTypeArchive(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<PostTypeArchiveData>(data);
  if (isSearch(data)) expectType<PostTypeArchiveWithSearchData>(data);
}

if (isPostArchive(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<PostTypeArchiveData>(data);
  expectType<PostArchiveData>(data);
  if (isSearch(data)) expectType<PostArchiveWithSearchData>(data);
}

if (isDate(data)) {
  expectType<Data>(data);
  expectType<ArchiveData>(data);
  expectType<DateData>(data);
  if (isSearch(data)) expectType<DateWithSearchData>(data);
}

if (isPostType(data)) {
  expectType<Data>(data);
  expectType<PostTypeData>(data);
}

if (isPost(data)) {
  expectType<Data>(data);
  expectType<PostTypeData>(data);
  expectType<PostData>(data);
}

if (isPage(data)) {
  expectType<Data>(data);
  expectType<PostTypeData>(data);
  expectType<PageData>(data);
}

if (isAttachment(data)) {
  expectType<Data>(data);
  expectType<PostTypeData>(data);
  expectType<AttachmentData>(data);
}

test("Types are fine!", () => {});
