export default (response: Response): number =>
  parseInt(response.headers.get("X-WP-TotalPages"));
