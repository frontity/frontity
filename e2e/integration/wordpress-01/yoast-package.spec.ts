import { ResolvePackages } from "../../../packages/types/utils";
import Router from "../../../packages/router/types";
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

type WindowWithFrontity = Cypress.AUTWindow & {
  frontity: ResolvePackages<Router>;
};

describe("Yoast Package", () => {
  before(() => {
    task("installPlugin", { name: "wordpress-seo" });
    task("installPlugin", { name: "code-snippets" });
    task("installPlugin", { name: "custom-post-type-ui" });
    task("loadDatabase", {
      path: "./wp-data/yoast-package/yoast-with-cpt.sql",
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
    `http://localhost:3001${link}?frontity_name=yoast-package`;

  /**
   * Check the title for the current page is the given one.
   *
   * @param link - The given link to execute the request.
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
   * Run a set of test to ensure the correct meta tags are being rendered.
   *
   * This way, snapshots are generated with a meaningful name and are easy to
   * read and check by a human being.
   *
   * @remarks The <title> tag is not tested using snapshots. That's because the
   * plugin we are using to generate snapshots gives an error when trying to
   * generate a snapshot for that tag (it also doesn't work well with strings).
   * @param link - The link to execute the request against.
   */
  const checkMetaTags = (link: string) => {
    it("should render the correct canonical URL", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('link[rel="canonical"]').toMatchSnapshot();
      });
    });

    it("should render the Open Graph tags", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get(
          `meta[property^="og:"],meta[property^="article:"],meta[property^="profile:"]`
        ).each((meta) => {
          cy.wrap(meta).toMatchSnapshot();
        });
      });
    });

    it("should render the Twitter tags", () => {
      cy.visitSSR(fullURL(link)).then(() => {
        cy.get('meta[name^="twitter:"]').each((meta) => {
          cy.wrap(meta).toMatchSnapshot();
        });
      });
    });

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
    const title = "Hello World From Yoast! - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Sample Page - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature Archives - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan Archives - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz, Author at Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site - Just another WordPress site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "The Terminator - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies Archive - Test WP Site";
    const link = "/movies/";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton Archives - Test WP Site";

    checkTitle(link, title);
    checkMetaTags(link);
  });

  /**
   * Test for the `<title>` tag while navigating through Frontity.
   */
  describe("Title tag", () => {
    it("should be correct while navigating", () => {
      // Navigate to the root
      cy.visit(`http://localhost:3001/?frontity_name=yoast-package`);

      cy.get("title").should(
        "contain",
        "Test WP Site - Just another WordPress site"
      );

      routerSet("/hello-world/");
      cy.get("title").should(
        "contain",
        "Hello World From Yoast! - Test WP Site"
      );

      routerSet("/sample-page/");
      cy.get("title").should("contain", "Sample Page - Test WP Site");

      routerSet("/category/nature/");
      cy.get("title").should("contain", "Nature Archives - Test WP Site");

      routerSet("/tag/japan/");
      cy.get("title").should("contain", "Japan Archives - Test WP Site");

      routerSet("/author/luisherranz");
      cy.get("title").should("contain", "luisherranz, Author at Test WP Site");

      routerSet("/movie/the-terminator/");
      cy.get("title").should("contain", "The Terminator - Test WP Site");

      routerSet("/movies/");
      cy.get("title").should("contain", "Movies Archive - Test WP Site");

      routerSet("/actor/linda-hamilton/");
      cy.get("title").should(
        "contain",
        "Linda Hamilton Archives - Test WP Site"
      );
    });
  });
});
