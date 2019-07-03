import WpSource from "../../..";
import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  page
} from "../handlers";

const wpComHandlers: WpSource["libraries"]["source"]["handlers"] = [
  {
    name: "post archive",
    priority: 10,
    pattern: "/",
    func: postArchive
  },
  {
    name: "category",
    priority: 10,
    pattern: "/category/:slug",
    func: category
  },
  {
    name: "subcategory",
    priority: 10,
    pattern: "/category/(.*)/:slug", // subcategories
    func: category
  },
  {
    name: "tag",
    priority: 10,
    pattern: "/tag/:slug",
    func: tag
  },
  {
    name: "author",
    priority: 10,
    pattern: "/author/:slug",
    func: author
  },
  {
    name: "date",
    priority: 10,
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    func: date
  },
  {
    name: "post",
    priority: 10,
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug",
    func: post
  },
  {
    name: "page",
    priority: 10,
    pattern: "/:slug",
    func: page
  },
  {
    name: "subpage",
    priority: 10,
    pattern: "/(.*)/:slug", // subpages
    func: page
  }
];

export default wpComHandlers;
