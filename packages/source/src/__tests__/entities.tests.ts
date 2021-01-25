import * as typeGuards from "../entities";
import * as mocks from "../../__tests__/mocks/entities";

describe("Entities type guards", () => {
  test("`isPostTypeEntity` should recognize post type entities", () => {
    expect(typeGuards.isPostTypeEntity(mocks.post)).toBe(true);
    expect(typeGuards.isPostTypeEntity(mocks.page)).toBe(true);
    expect(typeGuards.isPostTypeEntity(mocks.attachment)).toBe(true);
    expect(typeGuards.isPostTypeEntity(mocks.comment)).toBe(true);
    expect(typeGuards.isPostTypeEntity(mocks.category)).toBe(false);
    expect(typeGuards.isPostTypeEntity(mocks.author)).toBe(false);
    expect(typeGuards.isPostTypeEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isPostTypeEntity(mocks.postType)).toBe(false);
  });

  test("`isPostEntity` should recognize only post entities", () => {
    expect(typeGuards.isPostEntity(mocks.post)).toBe(true);
    expect(typeGuards.isPostEntity(mocks.page)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.category)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.author)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isPostEntity(mocks.postType)).toBe(false);
  });

  test("`isPageEntity` should recognize only page entities", () => {
    expect(typeGuards.isPageEntity(mocks.post)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.page)).toBe(true);
    expect(typeGuards.isPageEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.category)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.author)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isPageEntity(mocks.postType)).toBe(false);
  });

  test("`isAttachmentEntity` should recognize only attachment entities", () => {
    expect(typeGuards.isAttachmentEntity(mocks.post)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.page)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.attachment)).toBe(true);
    expect(typeGuards.isAttachmentEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.category)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.author)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isAttachmentEntity(mocks.postType)).toBe(false);
  });

  test("`isCommentEntity` should recognize only comment entities", () => {
    expect(typeGuards.isCommentEntity(mocks.post)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.page)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.comment)).toBe(true);
    expect(typeGuards.isCommentEntity(mocks.category)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.author)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isCommentEntity(mocks.postType)).toBe(false);
  });

  test("`isTermEntity` should recognize term entities", () => {
    expect(typeGuards.isTermEntity(mocks.post)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.page)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.category)).toBe(true);
    expect(typeGuards.isTermEntity(mocks.author)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isTermEntity(mocks.postType)).toBe(false);
  });

  test("`isAuthorEntity` should recognize author entities", () => {
    expect(typeGuards.isAuthorEntity(mocks.post)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.page)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.category)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.author)).toBe(true);
    expect(typeGuards.isAuthorEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isAuthorEntity(mocks.postType)).toBe(false);
  });

  test("`isTaxonomyEntity` should recognize taxonomy entities", () => {
    expect(typeGuards.isTaxonomyEntity(mocks.post)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.page)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.category)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.author)).toBe(false);
    expect(typeGuards.isTaxonomyEntity(mocks.taxonomy)).toBe(true);
    expect(typeGuards.isTaxonomyEntity(mocks.postType)).toBe(false);
  });

  test("`isTypeEntity` should recognize type entities", () => {
    expect(typeGuards.isTypeEntity(mocks.post)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.page)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.attachment)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.comment)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.category)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.author)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.taxonomy)).toBe(false);
    expect(typeGuards.isTypeEntity(mocks.postType)).toBe(true);
  });
});
