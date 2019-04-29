import * as handlers from "../../handlers";
import { Handler } from "../../../types";

const patterns: {
  pattern: string;
  handler: Handler;
}[] = [
  {
    pattern: "/",
    handler: handlers.postArchive
  },
  {
    pattern: "/category/:slug",
    handler: handlers.category
  },
  {
    pattern: "/tag/:slug",
    handler: handlers.tag
  },
  {
    pattern: "/author/:slug",
    handler: handlers.author
  },
  {
    pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
    handler: handlers.date
  },
  {
    pattern: "/:year(\\d+)/:slug",
    handler: handlers.post
  },
  {
    pattern: "/:year(\\d+)/:postSlug/:slug",
    handler: handlers.attachment
  },
  {
    pattern: "/:slug",
    handler: handlers.page
  },
  {
    pattern: "/(.*)/:slug", // subpages
    handler: handlers.page
  }
];

export default patterns;