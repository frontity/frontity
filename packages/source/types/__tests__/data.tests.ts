import { Data, TaxonomyData } from "../data";
import { expectType } from "frontity/types/helpers";
import {
  onlyStatus,
  notFound,
  term,
  termWithSearchData,
  category,
  categoryWithSearchData,
  tag,
  tagWithSearchData,
  author,
  authorWithSearchData,
  postTypeArchive,
  postTypeArchiveWithSearchData,
  postArchive,
  postArchiveWithSearchData,
  dateArchive,
  dateArchiveWithSearchData,
  postType,
  post,
  page,
  attachment,
  redirection,
} from "../../__tests__/mocks/data";

const data: Record<string, Data> = {};

// As long as it extends `Data`, any object can be added to `data`.
data.onlyStatus = onlyStatus;
data.notFound = notFound;
data.term = term;
data.termWithSearchData = termWithSearchData;
data.category = category;
data.categoryWithSearchData = categoryWithSearchData;
data.tag = tag;
data.tagWithSearchData = tagWithSearchData;
data.author = author;
data.authorWithSearchData = authorWithSearchData;
data.postTypeArchive = postTypeArchive;
data.postTypeArchiveWithSearchData = postTypeArchiveWithSearchData;
data.postArchive = postArchive;
data.postArchiveWithSearchData = postArchiveWithSearchData;
data.dateArchive = dateArchive;
data.dateArchiveWithSearchData = dateArchiveWithSearchData;
data.postType = postType;
data.post = post;
data.page = page;
data.attachment = attachment;
data.redirection = redirection;

// Check that TermData and TaxonomyData are equivalent.
const taxonomy: TaxonomyData = term;
expectType<true>(taxonomy.isTaxonomy);
expectType<true>(taxonomy.isTerm);

// eslint-disable-next-line jest/expect-expect
test("Types are fine!", () => {
  // Do nothing here.
});
