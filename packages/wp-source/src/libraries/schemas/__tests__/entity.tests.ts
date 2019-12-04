import { normalize } from "normalizr";
// https://demo.worona.org/?rest_route=/wp/v2/posts/60&_embed=true
import post60 from "./mocks/post-60.json";
// https://demo.worona.org/?rest_route=/wp/v2/categories/7&_embed=true
import category7 from "./mocks/category-7.json";
// https://demo.worona.org/?rest_route=/wp/v2/tags/10&_embed=true
import tag10 from "./mocks/tag-10.json";
// https://demo.worona.org/?rest_route=/wp/v2/users/4&_embed=true
import author4 from "./mocks/author-4.json";
// https://demo.worona.org/?rest_route=/wp/v2/media/193&_embed=true
import media193 from "./mocks/media-193.json";
// https://demo.worona.org/?rest_route=/wp/v2/pages/184&_embed=true
import page184 from "./mocks/page-with-subpage.json";

import latestMovie from "./mocks/latest-movie.json";
import { entity } from "../";

test("Convert post using entity", () => {
  const { entities } = normalize(post60, entity);
  expect(entities.postEntity[60]).toMatchSnapshot();
  expect(entities.attachmentEntity[62]).toMatchSnapshot();
  expect(entities.taxonomyEntity[3]).toMatchSnapshot();
  expect(entities.taxonomyEntity[10]).toMatchSnapshot();
  expect(entities.authorEntity[4]).toMatchSnapshot();
  expect(entities.taxonomyEntity.post).toMatchSnapshot();
});

test("Convert a category using entity", () => {
  const { entities } = normalize(category7, entity);
  expect(entities.taxonomyEntity[7]).toMatchSnapshot();
});

test("Convert a tag using entity", () => {
  const { entities } = normalize(tag10, entity);
  expect(entities.taxonomyEntity[10]).toMatchSnapshot();
});

test("Convert a author using entity", () => {
  const { entities } = normalize(author4, entity);
  expect(entities.authorEntity[4]).toMatchSnapshot();
});

test("Convert an attachment using entity", () => {
  const { entities } = normalize(media193, entity);
  expect(entities.attachmentEntity[193]).toMatchSnapshot();
});

test("Convert a page using entity and ignore subpages", () => {
  const { entities } = normalize(page184, entity);
  expect(entities.postEntity[184]).toMatchSnapshot();
  expect(entities.postEntity[211]).toBe(undefined);
});

test("Convert a latest taxonomy using entity", () => {
  const { entities } = normalize(latestMovie, entity);
  expect(entities.taxonomyEntity.movie).toMatchSnapshot();
});
