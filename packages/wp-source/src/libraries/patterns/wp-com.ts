import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  page
} from "../handlers";

export default [
  {
    pattern: "/",
    handler: postArchive
  },
  {
    pattern: "/category/:slug",
    handler: category
  },
  {
    pattern: "/category/(.*)/:slug", // subcategories
    handler: category
  },
  {
    pattern: "/tag/:slug",
    handler: tag
  },
  {
    pattern: "/author/:slug",
    handler: author
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    handler: date
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug",
    handler: post
  },
  {
    pattern: "/:slug",
    handler: page
  },
  {
    pattern: "/(.*)/:slug", // subpages
    handler: page
  }
];
