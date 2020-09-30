import author from "./author";
import date from "./date";
import taxonomyHandler from "./taxonomy";
import postTypeHandler from "./postType";
import postTypeArchiveHandler from "./postTypeArchive";
import postTypeWithQueryHandler from "./postTypeWithQuery";

// Post Types
export const post = postTypeHandler({ endpoints: ["posts"] });
export const page = postTypeHandler({ endpoints: ["pages"] });
export const attachment = postTypeHandler({ endpoints: ["media"] });
export const postType = postTypeHandler({
  endpoints: ["posts", "pages", "media"],
});
export const postWithQuery = postTypeWithQueryHandler({
  type: "post",
  endpoint: "posts",
});
export const pageWithQuery = postTypeWithQueryHandler({
  type: "page",
  endpoint: "pages",
  idParamName: "page_id",
});

// Taxonomies
export const tag = taxonomyHandler({ taxonomy: "tag", endpoint: "tags" });
export const category = taxonomyHandler({
  taxonomy: "category",
  endpoint: "categories",
});

// Post Type Archive
export const postArchive = postTypeArchiveHandler({
  type: "post",
  endpoint: "posts",
});

// Other handlers
export { author, date };

// Handlers generators
export {
  taxonomyHandler,
  postTypeHandler,
  postTypeArchiveHandler,
  postTypeWithQueryHandler,
};
