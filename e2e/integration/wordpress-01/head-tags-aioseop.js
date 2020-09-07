describe("Head Tags - All in One SEO Pack", () => {
  before(() => {
    cy.task("installPlugin", { name: "all-in-one-seo-pack" });
    cy.task("installPlugin", { name: "rest-api-head-tags" });
    cy.task("installPlugin", { name: "custom-post-type-ui" });
    cy.task("loadDatabase", {
      path: "./wp-data/head-tags/aioseop.sql",
    });
  });

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  /**
   * Check the title for the current page is the given one.
   *
   * @param title - The page title for the given link.
   */
  const checkTitle = (title) => {
    it("should render the correct title", () => {
      cy.get("title").should("contain", title);
    });
  };

  /**
   * Ensure that the canonical link has been rendered.
   */
  const checkCanonical = () => {
    it("should render the correct link tags", () => {
      cy.get('link[rel="canonical"]').toMatchSnapshot();
    });
  };

  /**
   * Ensure that the ld+json schema has been rendered.
   */
  const checkSchema = () => {
    it("should render the schema tag", () => {
      cy.get('script[type="application/ld+json"]').toMatchSnapshot();
    });
  };

  /**
   * Visit the specified link with scripts disabled.
   *
   * @param link - The link of the page.
   * @param options - Visit options.
   */
  const visitLink = (link, options) => {
    cy.visit(`http://localhost:3001${link}?name=head-tags`, options);
  };

  /**
   * Change the router value in Frontity.
   *
   * @param link - The link of the page.
   */
  const routerSet = (link) => {
    cy.window().then((win) => {
      win.frontity.actions.router.set(link);
    });
  };

  /**
   * Tests for posts.
   */
  describe("Post", () => {
    const link = "/hello-world/";
    const title = "Hello world! | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Sample Page | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz | Test WP Site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the schema here because it is not included by the
     * _REST API - Head Tags_ plugin when used along with _All in One SEO Pack_,
     * because it is not generated correctly for authors.
     */
    checkTitle(title);
    checkCanonical();
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site | Just another WordPress site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "The Terminator | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies | Test WP Site";
    const link = "/movies/";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton | Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkSchema();
  });

  /**
   * Test for the `<title>` tag while navigating through Frontity.
   */
  describe("Title tag", () => {
    it("should be correct while navigating", () => {
      visitLink("/");
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
