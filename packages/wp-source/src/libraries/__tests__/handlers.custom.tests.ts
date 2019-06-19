import Resolver from "../resolver";
import { Handler } from "../../..";

const patterns = {
  postArchive: "/",
  category: "/category/:slug",
  tag: "/tag/:slug",
  author: "/author/:name",
  date: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
  postOrPage: "/:slug",
  attachment: "/:year(\\d+)/:postSlug/:attachmentSlug",
  customList: "custom-list",
  carousel: "carousel-:postId(\\d+)",
  anyName: ":name"
};

// Mock handlers from patterns
const routes: {
  [type: string]: {
    name: string;
    priority: number;
    pattern: string;
    func: Handler;
  };
} = {};
Object.keys(patterns).forEach(
  type =>
    (routes[type] = {
      name: type,
      priority: 10,
      pattern: patterns[type],
      func: jest.fn(() => Promise.resolve())
    })
);

// Add handlers
const resolver = new Resolver();
Object.values(routes).forEach(patternObj => {
  resolver.addHandler(patternObj);
});

// Test 'handler' is executed with the correct params
const testMatch = (type, path, params) => {
  const match = resolver.match(path);
  expect(match.handler).toBe(routes[type].func);
  expect(match.params).toEqual(params);
};

describe("resolver", () => {
  test("match different routes", async () => {
    testMatch("postArchive", "/", {});
    testMatch("category", "/category/nature", { slug: "nature" });
    testMatch("tag", "/tag/japan", { slug: "japan" });
    testMatch("author", "/author/alan", { name: "alan" });
    testMatch("date", "/2019", { year: "2019" });
    testMatch("date", "/2019/04", { year: "2019", month: "04" });
    testMatch("date", "/2019/04/20", {
      year: "2019",
      month: "04",
      day: "20"
    });
    testMatch("postOrPage", "/the-beauties-of-gullfoss", {
      slug: "the-beauties-of-gullfoss"
    });
    testMatch("postOrPage", "/about-us", { slug: "about-us" });
    testMatch("attachment", "/2019/the-beauties-of-gullfoss/waterfall", {
      year: "2019",
      postSlug: "the-beauties-of-gullfoss",
      attachmentSlug: "waterfall"
    });
    testMatch("customList", "custom-list", {});
    testMatch("carousel", "carousel-60", { postId: "60" });
    testMatch("anyName", "whatever", { name: "whatever" });
  });
});
