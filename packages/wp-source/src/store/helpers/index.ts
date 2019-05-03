export const getIdBySlug = (
  entityMap: {
    [id: number]: {
      slug: string;
      id: number;
    };
  },
  slug: string
): number | undefined => {
  const entity = Object.values(entityMap).find(e => e.slug === slug);
  return entity && entity.id;
};

export const getTotal = (response: Response): number =>
  parseInt(response.headers.get("X-WP-Total"));

export const getTotalPages = (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));

export const normalizePath = (pathOrLink: string): string => {
  try {
    return new URL(pathOrLink).pathname;
  } catch (e) {
    // is not a URL
    return pathOrLink;
  }
};
