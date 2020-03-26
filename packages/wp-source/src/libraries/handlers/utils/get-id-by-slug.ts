export default (
  entityMap: {
    [id: number]: {
      slug: string;
      id: number;
    };
  },
  slug: string
): number | undefined => {
  const entity = Object.values(entityMap).find((e) => e.slug === slug);
  return entity && entity.id;
};
