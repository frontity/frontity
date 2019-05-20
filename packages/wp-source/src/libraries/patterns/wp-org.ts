import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  attachment,
  page,
  postType
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
  // plain (NOT SUPPORTED YET)
  {
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug", // day & name
    handler: post
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)/:slug", // month & name
    handler: post
  },
  {
    pattern: "/archives/:id", // numeric
    handler: post
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:postSlug/:slug", // day & name
    handler: attachment
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)/:postSlug/:slug", // month & name
    handler: attachment
  },
  {
    pattern: "/archives/:postId/:slug", // numeric
    handler: attachment
  },
  {
    pattern: "/:slug", // post or page or attachment
    handler: postType
  },
  {
    pattern: "/(.*)/:slug", // page or attachment
    handler: postType
  }
];
