/* eslint-disable jest/expect-expect */
import { getMatch } from "../get-match";

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
  anyName: ":name",
};

// Mock handlers from patterns
const handlers = Object.keys(patterns).map((name) => ({
  name: name,
  priority: 10,
  pattern: patterns[name],
  func: jest.fn(() => Promise.resolve()),
}));

// Test 'handler' is executed with the correct params
const testMatch = (name, route, params): void => {
  const match = getMatch({ route }, handlers);
  expect(match.func).toEqual(handlers.find((p) => p.name === name).func);
  expect(match.params).toEqual(params);
};

describe("getMatch", () => {
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
      day: "20",
    });
    testMatch("postOrPage", "/the-beauties-of-gullfoss", {
      slug: "the-beauties-of-gullfoss",
    });
    testMatch("postOrPage", "/about-us", { slug: "about-us" });
    testMatch("attachment", "/2019/the-beauties-of-gullfoss/waterfall", {
      year: "2019",
      postSlug: "the-beauties-of-gullfoss",
      attachmentSlug: "waterfall",
    });
    testMatch("customList", "custom-list", {});
    testMatch("carousel", "carousel-60", { postId: "60" });
    testMatch("anyName", "whatever", { name: "whatever" });
  });
});
