import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  attachment,
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
    handler: page
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
    pattern: "/:year(\\d+)/:slug",
    handler: post
  },
  {
    pattern: "/:year(\\d+)/:postSlug/:slug",
    handler: attachment
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
