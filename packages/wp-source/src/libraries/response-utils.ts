export const getTotal = (response: Response, _default: number): number =>
  parseInt(response.headers.get("X-WP-Total")) || _default;

export const getTotalPages = (response: Response, _default: number): number =>
  parseInt(response.headers.get("X-WP-TotalPages")) || _default;

export default { getTotal, getTotalPages };
