import { api } from "../effects";
import fetch from "cross-fetch";

jest.mock("cross-fetch");
const mockedFetch = fetch as jest.Mock<typeof fetch>;

describe("api", () => {
  test("get from WP.org without params", () => {
    api.init({ siteUrl: "https://test.frontity.org" })
    api.get({ endpoint: "posts" });
    const [[fetchCall]] = mockedFetch.mock.calls.slice(-1);
    expect(fetchCall).toBe("https://test.frontity.org/wp-json/wp/v2/posts");
  });

  test("get from WP.org without params 2", () => {
    const endpoint = "posts/12";
    const siteUrl = "https://test.frontity.org";
    api.get({ endpoint, siteUrl });
    const [[fetchCall]] = mockedFetch.mock.calls.slice(-1);
    expect(fetchCall).toBe("https://test.frontity.org/wp-json/wp/v2/posts/12");
  });

  test("get from WP.org with params", () => {
    const endpoint = "posts";
    const siteUrl = "https://test.frontity.org";
    const params = { _embed: true, include: "12,13,14" };
    api.get({ endpoint, params, siteUrl });
    const [[fetchCall]] = mockedFetch.mock.calls.slice(-1);
    expect(fetchCall).toBe(
      "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&include=12,13,14"
    );
  });

  test("get from WP.com without params", () => {
    const endpoint = "posts";
    const siteUrl = "https://test.frontity.org";
    const isWpCom = true;
    api.get({ endpoint, siteUrl, isWpCom });
    const [[fetchCall]] = mockedFetch.mock.calls.slice(-1);
    expect(fetchCall).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts"
    );
  });

  test("get from WP.com with params", () => {
    const endpoint = "posts";
    const siteUrl = "https://test.frontity.org";
    const isWpCom = true;
    const params = { _embed: true, include: "12,13,14" };
    api.get({ endpoint, params, siteUrl, isWpCom });
    const [[fetchCall]] = mockedFetch.mock.calls.slice(-1);
    expect(fetchCall).toBe(
      "https://public-api.wordpress.com/wp/v2/sites/test.frontity.org/posts?_embed=true&include=12,13,14"
    );
  });
});
