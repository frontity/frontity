import Api from "../api";
import fetch from "cross-fetch";

jest.mock("cross-fetch");
const mockedFetch = fetch as jest.Mock;

const lastFetch = () => mockedFetch.mock.calls.slice(-1)[0][0];
const api = new Api();

describe("api", () => {
  test("get from WP.org without params", async () => {
    api.get({
      api: "https://test.frontity.org/wp-json",
      endpoint: "posts"
    });
    expect(lastFetch()).toBe("https://test.frontity.org/wp-json/wp/v2/posts");
  });

  test("get from WP.org without params 2", () => {
    api.get({
      api: "https://test.frontity.org/wp-json/",
      endpoint: "posts/12"
    });
    expect(lastFetch()).toBe(
      "https://test.frontity.org/wp-json/wp/v2/posts/12"
    );
  });

  test("get from WP.org with params", () => {
    api.get({
      api: "https://test.frontity.org/wp-json/",
      endpoint: "posts",
      params: { _embed: true, include: "12,13,14" }
    });
    expect(lastFetch()).toBe(
      "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&include=12,13,14"
    );
  });

  test("get from WP.org and a different namespace", () => {
    api.get({
      api: "https://test.frontity.org/wp-json/",
      endpoint: "/discovery/v1",
      params: { link: "/the-beauties-of-gullfoss" }
    });
    expect(lastFetch()).toBe(
      "https://test.frontity.org/wp-json/discovery/v1?link=/the-beauties-of-gullfoss"
    );
  });

  test("get from WP.com without params", () => {
    api.get({
      api: "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org",
      endpoint: "posts",
      isWpCom: true
    });
    expect(lastFetch()).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts"
    );
  });

  test("get from WP.com with params", () => {
    const endpoint = "posts";
    const isWpCom = true;
    const params = { _embed: true, include: "12,13,14" };
    api.get({
      endpoint,
      params,
      api: "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/",
      isWpCom
    });
    expect(lastFetch()).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts?_embed=true&include=12,13,14"
    );
  });

  test("get from api specified with the init function", () => {
    api.init({
      api: "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org",
      isWpCom: true
    });
    api.get({
      endpoint: "posts"
    });
    expect(lastFetch()).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts"
    );
    api.get({
      endpoint: "posts",
      params: { _embed: true, include: "12,13,14" }
    });
    expect(lastFetch()).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts?_embed=true&include=12,13,14"
    );
  });
});
