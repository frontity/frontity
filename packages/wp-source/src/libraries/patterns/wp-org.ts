import WpSource from "../../..";
import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  attachment,
  postTypes
} from "../handlers";

const wpOrgHandlers: WpSource["libraries"]["source"]["handlers"] = [
  {
    name: "post archive",
    priority: 10,
    pattern: "/",
    func: postArchive
  },
  {
    name: "category",
    priority: 20,
    pattern: "/category/:slug",
    func: category
  },
  {
    name: "subcategory",
    priority: 20,
    pattern: "/category/(.*)/:slug", // subcategories
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
    name: "post by day",
    priority: 30,
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug", // day & name
    func: post
  },
  {
    name: "post by month",
    priority: 40,
    pattern: "/:year(\\d+)/:month(\\d+)/:slug", // month & name
    func: post
  },
  {
    name: "post by id",
    priority: 50,
    pattern: "/archives/:id", // numeric
    func: post
  },
  {
    name: "attachment from post by day",
    priority: 60,
    pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:postSlug/:slug", // day & name
    func: attachment
  },
  {
    name: "attachment from post by month",
    priority: 70,
    pattern: "/:year(\\d+)/:month(\\d+)/:postSlug/:slug", // month & name
    func: attachment
  },
  {
    name: "attachment from post by id",
    priority: 80,
    pattern: "/archives/:postId/:slug", // numeric
    func: attachment
  },
  {
    name: "post type",
    priority: 90,
    pattern: "/:slug", // post or page or attachment
    func: postTypes
  },
  {
    name: "sub post type",
    priority: 90,
    pattern: "/(.*)/:slug", // page or attachment
    func: postTypes
  }
];

export default wpOrgHandlers;
