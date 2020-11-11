import { Entity } from "@frontity/source/types";

/**
 * Search for an entity in the given map with the given slug.
 *
 * @param entityMap - Map of entities.
 * @param slug - Entity slug.
 * @returns Entity ID or undefined.
 */
const getIdBySlug = (
  entityMap: Record<number, Entity>,
  slug: string
): number | undefined => {
  const entity = Object.values(entityMap).find((e) => e.slug === slug);
  if (typeof entity?.id === "number") return entity.id;
};

export default getIdBySlug;
