import author from "./author";
import date from "./date";
import taxonomyHandler from "./taxonomy";
import postTypeHandler from "./postType";
import postTypeArchiveHandler from "./postTypeArchive";
import postTypeWithQueryHandler from "./postTypeWithQuery";
import pageWithQuery from "./pageWithQuery";

// Post Types
export const post = postTypeHandler({ endpoints: ["posts"] });
export const page = postTypeHandler({ endpoints: ["pages"] });
export const attachment = postTypeHandler({ endpoints: ["media"] });
export const postType = postTypeHandler({
  endpoints: ["posts", "pages", "media"],
});
export const postTypeWithQuery = postTypeWithQueryHandler({
  endpoints: ["posts", "pages"],
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
export { author, date, pageWithQuery };

// Handlers generators
export { taxonomyHandler, postTypeHandler, postTypeArchiveHandler };
