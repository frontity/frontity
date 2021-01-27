import { ResolvePackages } from "../../../packages/types/src/utils";
import Router from "../../../packages/router/types";
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

type WindowWithFrontity = Cypress.AUTWindow & {
  frontity: ResolvePackages<Router>;
};

describe("Head Tags - All in One SEO Pack", () => {
  before(() => {
    task("installPlugin", { name: "all-in-one-seo-pack", version: "3.7.1" });
    task("installPlugin", { name: "rest-api-head-tags" });
    task("installPlugin", { name: "custom-post-type-ui" });
    task("loadDatabase", {
      path: "./wp-data/head-tags/aioseop.sql",
    });
  });

  after(() => {
    task("resetDatabase");
    task("removeAllPlugins");
  });

  /**
   * Generates the full url to be loaded and tested.
   *
   * @param link - The pathname to wich the test should navigate.
   * @returns The full url.
   */
  const fullURL = (link: string) =>
    `http://localhost:3001${link}?frontity_name=head-tags`;

  /**
   * Check the title for the current page is the given one.
   *
   * @param link - The given link.
   * @param title - The page title for the given link.
   */
  const checkTitle = (link: string, title: string) => {
    it("should render the correct title", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get("title").should("contain", title);
      });
    });
  };

  /**
   * Ensure that the canonical link has been rendered.
   *
   * @param link - The given link.
   */
  const checkCanonical = (link: string) => {
    it("should render the correct canonical link", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('link[rel="canonical"]').toMatchSnapshot();
      });
    });
  };

  /**
   * Ensure that the ld+json schema has been rendered.
   *
   * @param link - The given link.
   */
  const checkSchema = (link: string) => {
    it("should render the schema tag", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('script[type="application/ld+json"]').toMatchSnapshot();
      });
    });
  };

  /**
   * Change the router value in Frontity.
   *
   * @param link - The link of the page.
   */
  const routerSet = (link: string) => {
    cy.window().then((win: WindowWithFrontity) => {
      win.frontity.actions.router.set(link);
    });
  };

  /**
   * Tests for posts.
   */
  describe("Post", () => {
    const link = "/hello-world/";
    const title = "Hello world! | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);

    /**
     * The `checkSchema()` call was replaced here by a check that the schema
     * tag simply exists and it is not empty.
     *
     * The reason for this is that the tag content is not the same for different
     * versions of WordPress:
     * - 5.4 : `"commentsCount": "1",`.
     * - 5.5 : `"commentsCount": 1,`.
     */
    it("should render the schema tag", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('script[type="application/ld+json"]').should("not.be.empty");
      });
    });
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Sample Page | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz | Test WP Site";

    /**
     * We don't check the schema here because it is not included by the
     * _REST API - Head Tags_ plugin when used along with _All in One SEO Pack_,
     * because it is not generated correctly for authors.
     */
    checkTitle(link, title);
    checkCanonical(link);
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site | Just another WordPress site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "The Terminator | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies | Test WP Site";
    const link = "/movies/";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton | Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkSchema(link);
  });

  /**
   * Test for the `<title>` tag while navigating through Frontity.
   */
  describe("Title tag", () => {
    it("should be correct while navigating", () => {
      cy.visit(fullURL("/"));

      cy.get("title").should(
        "contain",
        "Test WP Site | Just another WordPress site"
      );

      routerSet("/hello-world/");
      cy.get("title").should("contain", "Hello world! | Test WP Site");

      routerSet("/sample-page/");
      cy.get("title").should("contain", "Sample Page | Test WP Site");

      routerSet("/category/nature/");
      cy.get("title").should("contain", "Nature | Test WP Site");

      routerSet("/tag/japan/");
      cy.get("title").should("contain", "Japan | Test WP Site");

      routerSet("/author/luisherranz");
      cy.get("title").should("contain", "luisherranz | Test WP Site");

      routerSet("/movie/the-terminator/");
      cy.get("title").should("contain", "The Terminator | Test WP Site");

      routerSet("/movies/");
      cy.get("title").should("contain", "Movies | Test WP Site");

      routerSet("/actor/linda-hamilton/");
      cy.get("title").should("contain", "Linda Hamilton | Test WP Site");
    });
  });
});
