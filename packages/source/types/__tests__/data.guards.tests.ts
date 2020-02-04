import { expectType } from "../utils";
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
  AttachmentData
} from "../data";

const data = {} as Data;

if (data.isError) {
  expectType<ErrorData>(data);
}

if (data.isArchive) {
  expectType<TaxonomyData | AuthorData | PostTypeArchiveData | DateData>(data);
}

if (data.isTaxonomy) {
  expectType<TaxonomyData>(data);
}

if (data.isCategory) {
  expectType<TaxonomyData>(data);
  expectType<CategoryData>(data);
}

if (data.isTag) {
  expectType<TaxonomyData>(data);
  expectType<TagData>(data);
}

if (data.isAuthor) {
  expectType<AuthorData>(data);
}

if (data.isPostTypeArchive) {
  expectType<PostTypeArchiveData>(data);
}

if (data.isPostArchive) {
  expectType<PostArchiveData>(data);
}

if (data.isDate) {
  expectType<DateData>(data);
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
