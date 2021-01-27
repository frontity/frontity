import { ResolvePackages } from "../../../packages/types/src/utils";
import Router from "../../../packages/router/types";
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

type WindowWithFrontity = Cypress.AUTWindow & {
  frontity: ResolvePackages<Router>;
};

describe("Head Tags - WP SEO", () => {
  before(() => {
    task("installPlugin", {
      name: "https://github.com/alleyinteractive/wp-seo/archive/master.zip",
    });
    task("installPlugin", { name: "rest-api-head-tags" });
    task("installPlugin", { name: "custom-post-type-ui" });
    task("loadDatabase", {
      path: "./wp-data/head-tags/wpseo.sql",
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
  const checkCustomTag = (link: string) => {
    it("should render a custom tag", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('meta[name="custom-tag"]').toMatchSnapshot();
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
    const title = "Post: Hello world! ~ Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkCustomTag(link);
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Page: Sample Page ~ Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkCustomTag(link);
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature archives ~ Test WP Site";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan archives ~ Test WP Site";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz, author at Test WP Site";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site ~ Just another WordPress site";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "Movie: The Terminator ~ Test WP Site";

    checkTitle(link, title);
    checkCanonical(link);
    checkCustomTag(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies archive ~ Test WP Site";
    const link = "/movies/";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton archives ~ Test WP Site";

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(link, title);
    checkCustomTag(link);
  });

  /**
   * Test for the `<title>` tag while navigating through Frontity.
   */
  describe("Title tag", () => {
    it("should be correct while navigating", () => {
      cy.visit(fullURL("/"));

      cy.get("title").should(
        "contain",
        "Test WP Site ~ Just another WordPress site"
      );

      routerSet("/hello-world/");
      cy.get("title").should("contain", "Post: Hello world! ~ Test WP Site");

      routerSet("/sample-page/");
      cy.get("title").should("contain", "Page: Sample Page ~ Test WP Site");

      routerSet("/category/nature/");
      cy.get("title").should("contain", "Nature archives ~ Test WP Site");

      routerSet("/tag/japan/");
      cy.get("title").should("contain", "Japan archives ~ Test WP Site");

      routerSet("/author/luisherranz");
      cy.get("title").should("contain", "luisherranz, author at Test WP Site");

      routerSet("/movie/the-terminator/");
      cy.get("title").should("contain", "Movie: The Terminator ~ Test WP Site");

      routerSet("/movies/");
      cy.get("title").should("contain", "Movies archive ~ Test WP Site");

      routerSet("/actor/linda-hamilton/");
      cy.get("title").should(
        "contain",
        "Linda Hamilton archives ~ Test WP Site"
      );
    });
  });
});
