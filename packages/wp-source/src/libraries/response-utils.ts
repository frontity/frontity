import WpSource from "../../types";

export const getTotal: WpSource["libraries"]["source"]["getTotal"] = (
  response,
  valueIfHeaderMissing
) => parseInt(response.headers.get("X-WP-Total")) || valueIfHeaderMissing || 0;

export const getTotalPages: WpSource["libraries"]["source"]["getTotal"] = (
  response,
  valueIfHeaderMissing
) =>
  parseInt(response.headers.get("X-WP-TotalPages")) ||
  valueIfHeaderMissing ||
  0;

export default { getTotal, getTotalPages };
