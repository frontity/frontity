export const getTotal = (response: Response): number =>
  parseInt(response.headers.get("X-WP-Total"));

export const getTotalPages = (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));

export default { getTotal, getTotalPages };
