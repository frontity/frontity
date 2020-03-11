export const getTotal = (response: Response, _default: number): number =>
  parseInt(response.headers.get("X-WP-Total")) || _default || 0;

export const getTotalPages = (response: Response, _default: number): number =>
  parseInt(response.headers.get("X-WP-TotalPages")) || _default || 0;

export default { getTotal, getTotalPages };
