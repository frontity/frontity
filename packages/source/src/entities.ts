import {
  Entity,
  PostTypeEntity,
  PostEntity,
  PageEntity,
  CommentEntity,
  TaxonomyEntity,
  AuthorEntity,
  EntityType,
  PostType,
  TaxonomyType,
  AttachmentEntity,
} from "../types/entities";

/**
 * Checks if a data object represents a post type entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isPostTypeEntity(entity: Entity): entity is PostTypeEntity {
  const { type, id } = entity as PostTypeEntity;
  return typeof type === "string" && typeof id === "number";
}

/**
 * Checks if a data object represents a post entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isPostEntity(entity: Entity): entity is PostEntity {
  return isPostTypeEntity(entity) && (entity as PostEntity).type === "post";
}

/**
 * Checks if a data object represents a page entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isPageEntity(entity: Entity): entity is PageEntity {
  return isPostTypeEntity(entity) && (entity as PageEntity).type === "page";
}

/**
 * Checks if a data object represents a page entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isAttachmentEntity(entity: Entity): entity is AttachmentEntity {
  return (
    isPostTypeEntity(entity) &&
    (entity as AttachmentEntity).type === "attachment"
  );
}

/**
 * Checks if a data object represents a comment entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isCommentEntity(entity: Entity): entity is CommentEntity {
  const { type, id } = entity as CommentEntity;
  return type === "comment" && typeof id === "number";
}

/**
 * Checks if a data object represents a taxonomy entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isTaxonomyEntity(entity: Entity): entity is TaxonomyEntity {
  const { taxonomy, id } = entity as TaxonomyEntity;
  return typeof taxonomy === "string" && typeof id === "number";
}

/**
 * Checks if a data object represents a author entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isAuthorEntity(entity: Entity): entity is AuthorEntity {
  const { name, id, avatar_urls: avatarUrls } = entity as AuthorEntity;
  return (
    typeof name === "string" &&
    typeof id === "number" &&
    typeof avatarUrls === "object"
  );
}

/**
 * Checks if a data object represents a type entity.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isEntityType(entity: Entity): entity is EntityType {
  const { slug, name, rest_base: restBase } = entity as EntityType;
  return (
    typeof slug === "string" &&
    typeof name === "string" &&
    typeof restBase === "string"
  );
}

/**
 * Checks if a data object represents a post type.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isPostType(entity: Entity): entity is PostType {
  return isEntityType(entity) && Array.isArray((entity as PostType).taxonomies);
}

/**
 * Checks if a data object represents a taxonomy type.
 *
 * @param entity - Object of type {@link Entity}.
 * @returns Boolean value.
 */
export function isTaxonomyType(entity: Entity): entity is TaxonomyType {
  return isEntityType(entity) && Array.isArray((entity as TaxonomyType).types);
}
