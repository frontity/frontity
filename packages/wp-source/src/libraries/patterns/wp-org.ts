import {
  postArchive,
  category,
  tag,
  author,
  comments,
  date,
  post,
  attachment,
  postType
} from "../handlers";

export default [
  {
    name: "post archive",
    priority: 20,
    pattern: "/",
    func: postArchive
  },
  {
    name: "category",
    priority: 20,
    pattern: "/category/(.*)?/:slug",
    func: category
  },
  {
    name: "tag",
    priority: 20,
    pattern: "/tag/:slug",
    func: tag
  },
  {
    name: "author",
    priority: 20,
    pattern: "/author/:slug",
    func: author
  },
  {
    name: "comments",
    priority: 20,
    pattern: "comments/:postId(\\d+)", // numeric
    func: comments
  },
  {
    name: "date",
    priority: 20,
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    func: date
  },
  {
    name: "attachment from post by day",
    priority: 20,
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)?/:postSlug(.*\\D.*)/:slug", // day & name
    func: attachment
  },
  {
    name: "post by id",
    priority: 20,
    pattern: "/archives/:id(\\d+)", // numeric
    func: post
  },
  {
    name: "attachment from post by id",
    priority: 20,
    pattern: "/archives/:postId(\\d+)/:slug", // numeric
    func: attachment
  },
  {
    name: "post type",
    priority: 30,
    pattern: "/(.*)?/:slug", // post or page or attachment
    func: postType
  }
];
