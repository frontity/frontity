import WpSource from "../../..";
import { concatPath } from "../route-utils";
import {
  postArchive,
  category,
  tag,
  author,
  date,
  post,
  attachment,
  postType,
  page
} from "../handlers";

const wpOrgHandlers = ({
  subdirectory,
  homepage,
  postsPage,
  categoryBase,
  tagBase
}: {
  subdirectory: string;
  homepage: string;
  postsPage: string;
  categoryBase: string;
  tagBase: string;
}): WpSource["libraries"]["source"]["handlers"] => {
  const handlers = [
    {
      name: "post archive",
      priority: 10,
      pattern: concatPath(subdirectory, postsPage),
      func: postArchive
    },
    {
      name: "category",
      priority: 20,
      pattern: concatPath(subdirectory, categoryBase, ":slug"),
      func: category
    },
    {
      name: "subcategory",
      priority: 20,
      pattern: concatPath(subdirectory, categoryBase, "/(.*)/:slug"), // subcategories
      func: category
    },
    {
      name: "tag",
      priority: 20,
      pattern: concatPath(subdirectory, tagBase, ":slug"),
      func: tag
    },
    {
      name: "author",
      priority: 20,
      pattern: concatPath(subdirectory, "/author/:slug"),
      func: author
    },
    {
      name: "date",
      priority: 20,
      pattern: concatPath(
        subdirectory,
        "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?"
      ),
      func: date
    },
    {
      name: "post by day",
      priority: 30,
      pattern: concatPath(
        subdirectory,
        "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug"
      ), // day & name
      func: post
    },
    {
      name: "post by month",
      priority: 40,
      pattern: concatPath(subdirectory, "/:year(\\d+)/:month(\\d+)/:slug"), // month & name
      func: post
    },
    {
      name: "post by id",
      priority: 50,
      pattern: concatPath(subdirectory, "/archives/:id"), // numeric
      func: post
    },
    {
      name: "attachment from post by day",
      priority: 60,
      pattern: concatPath(
        subdirectory,
        "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:postSlug/:slug"
      ), // day & name
      func: attachment
    },
    {
      name: "attachment from post by month",
      priority: 70,
      pattern: concatPath(
        subdirectory,
        "/:year(\\d+)/:month(\\d+)/:postSlug/:slug"
      ), // month & name
      func: attachment
    },
    {
      name: "attachment from post by id",
      priority: 80,
      pattern: concatPath(subdirectory, "/archives/:postId/:slug"), // numeric
      func: attachment
    },
    {
      name: "post type",
      priority: 90,
      pattern: concatPath(subdirectory, "/:slug"), // post or page or attachment
      func: postType
    },
    {
      name: "sub post type",
      priority: 90,
      pattern: concatPath(subdirectory, "/(.*)/:slug"), // page or attachment
      func: postType
    }
  ];

  // add homepage
  if (homepage) {
    handlers.push({
      name: "homepage",
      priority: 10,
      pattern: concatPath(subdirectory, homepage),
      func: args => page({ ...args, params: { slug: homepage } })
    });
  }

  return handlers;
};

export default wpOrgHandlers;
