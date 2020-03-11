export const getTotal = (
  response: Response,
  valueIfHeaderMissing: number
): number =>
  parseInt(response.headers.get("X-WP-Total")) || valueIfHeaderMissing || 0;

export const getTotalPages = (
  response: Response,
  valueIfHeaderMissing: number
): number =>
  parseInt(response.headers.get("X-WP-TotalPages")) ||
  valueIfHeaderMissing ||
  0;

export default { getTotal, getTotalPages };
