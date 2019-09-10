import taxonomy from "./taxonomy";

export default taxonomy({
  taxonomy: { type: "tag", endpoint: "tags" },
  postType: { param: "tags" }
});
