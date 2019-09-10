import taxonomy from "./taxonomy";

export default taxonomy({
  taxonomy: { type: "category", endpoint: "categories" },
  postType: { param: "categories" }
});
