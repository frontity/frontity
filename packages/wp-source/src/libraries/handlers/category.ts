import taxonomy from "./taxonomy";

export default taxonomy({
  taxonomy: { type: "category", endpoint: "categories" },
  postType: { endpoint: "posts", param: "categories" },
  truths: { isCategory: true }
});
