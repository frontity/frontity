describe("Head Tags - WP SEO 0.13", () => {
  before(() => {
    cy.task("installPlugin", {
      name: "https://github.com/alleyinteractive/wp-seo/archive/v0.13.0.zip",
    });
    cy.task("installPlugin", { name: "rest-api-head-tags" });
    cy.task("installPlugin", { name: "custom-post-type-ui" });
    cy.task("loadDatabase", {
      path: "./wp-data/head-tags/wpseo.sql",
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
    it("should render the correct canonical link", () => {
      cy.get('link[rel="canonical"]').toMatchSnapshot();
    });
  };

  /**
   * Ensure that the ld+json schema has been rendered.
   */
  const checkCustomTag = () => {
    it("should render a custom tag", () => {
      cy.get('meta[name="custom-tag"]').toMatchSnapshot();
    });
  };

  /**
   * Visit the specified link with scripts disabled.
   *
   * @param link - The link of the page.
   * @param options - Visit options.
   */
  const visitLink = (link, options) => {
    cy.visit(`http://localhost:3001${link}?frontity_name=head-tags`, options);
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
    const title = "Post: Hello world! ~ Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkCustomTag();
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Page: Sample Page ~ Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkCustomTag();
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature archives ~ Test WP Site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan archives ~ Test WP Site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz, author at Test WP Site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site ~ Just another WordPress site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "Movie: The Terminator ~ Test WP Site";

    before(() => visitLink(link, { script: false }));
    checkTitle(title);
    checkCanonical();
    checkCustomTag();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies archive ~ Test WP Site";
    const link = "/movies/";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton archives ~ Test WP Site";

    before(() => visitLink(link, { script: false }));

    /**
     * We don't check the canonical for any archive because it is not included
     * by the WordPress theme when the WP SEO plugin is used.
     */
    checkTitle(title);
    checkCustomTag();
  });

  /**
   * Test for the `<title>` tag while navigating through Frontity.
   */
  describe("Title tag", () => {
    it("should be correct while navigating", () => {
      visitLink("/");
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
