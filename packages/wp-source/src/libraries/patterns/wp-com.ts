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
    name: "date",
    priority: 20,
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    func: date
  },
  {
    name: "post",
    priority: 20,
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug",
    func: post
  },
  {
    name: "page",
    priority: 20,
    pattern: "/(.*)?/:slug",
    func: page
  }
];
