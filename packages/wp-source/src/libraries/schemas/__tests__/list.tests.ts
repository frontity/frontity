import { normalize } from "normalizr";
// https://demo.worona.org/?rest_route=/wp/v2/posts&categories=7&_embed=true
import category7 from "./mocks/posts-from-category-7.json";
// https://demo.worona.org/?rest_route=/wp/v2/categories&_embed=true&per_page=3
import categoriesList from "./mocks/categories-list.json";
// https://demo.worona.org/?rest_route=/wp/v2/tags&_embed=true
import tagsList from "./mocks/tags-list.json";
// https://demo.worona.org/?rest_route=/wp/v2/users&_embed=true
import authorList from "./mocks/author-list.json";
// https://demo.worona.org/?rest_route=/wp/v2/media&_embed=true
import mediaList from "./mocks/media-list.json";
import { list } from "../";

test("Convert list of posts using list", () => {
  const { entities } = normalize(category7, list);
  expect(entities).toMatchSnapshot();
});

test("Convert a category list", () => {
  const { entities } = normalize(categoriesList, list);
  expect(entities).toMatchSnapshot();
});

test("Convert a tag list", () => {
  const { entities } = normalize(tagsList, list);
  expect(entities).toMatchSnapshot();
});

test("Convert a author list", () => {
  const { entities } = normalize(authorList, list);
  expect(entities).toMatchSnapshot();
});

test("Convert a media list", () => {
  const { entities } = normalize(mediaList, list);
  expect(entities).toMatchSnapshot();
});
