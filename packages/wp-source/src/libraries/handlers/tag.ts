import taxonomy from "./taxonomy";

export default taxonomy({
  taxonomy: { type: "tag", endpoint: "tags" },
  postType: { endpoint: "posts", param: "tags" },
  truths: { isTag: true }
});
