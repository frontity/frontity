describe("Yoast Package", () => {
  before(() => {
    cy.task("installPlugin", { name: "wordpress-seo" });
    cy.task("installPlugin", { name: "code-snippets" });
    cy.task("installPlugin", { name: "custom-post-type-ui" });
    cy.task("loadDatabase", {
      path: "./wp-data/yoast-package/yoast-with-cpt.sql",
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
   * Run a set of test to ensure the correct meta tags are being rendered.
   *
   * This way, snapshots are generated with a meaningful name and are easy to
   * read and check by a human being.
   *
   * @remarks The <title> tag is not tested using snapshots. That's because the
   * plugin we are using to generate snapshots gives an error when trying to
   * generate a snapshot for that tag (it also doesn't work well with strings).
   */
  const checkMetaTags = () => {
    it("should render the correct canonical URL", () => {
      cy.get('link[rel="canonical"]').toMatchSnapshot();
    });

    it("should render the robots tag", () => {
      cy.get('meta[name="robots"]').toMatchSnapshot();
    });

    it("should render the Open Graph tags", () => {
      cy.get(
        `
          meta[property^="og:"],
          meta[property^="article:"],
          meta[property^="profile:"]
        `
      ).each((meta) => {
        cy.wrap(meta).toMatchSnapshot();
      });
    });

    it("should render the Twitter tags", () => {
      cy.get('meta[name^="twitter:"]').each((meta) => {
        cy.wrap(meta).toMatchSnapshot();
      });
    });

    it("should render the schema tag", () => {
      cy.get('script[type="application/ld+json"]').toMatchSnapshot();
    });
  };

  /**
   * Tests for posts.
   */
  describe("Post", () => {
    const link = "/hello-world/";
    const title = "Hello World From Yoast! - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "/sample-page/";
    const title = "Sample Page - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "/category/nature/";
    const title = "Nature Archives - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "/tag/japan/";
    const title = "Japan Archives - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "/author/luisherranz";
    const title = "luisherranz, Author at Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for the homepage.
   */
  describe("Homepage", () => {
    const link = "/";
    const title = "Test WP Site - Just another WordPress site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link = "/movie/the-terminator/";
    const title = "The Terminator - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("CPT (archive)", () => {
    const title = "Movies Archive - Test WP Site";
    const link = "/movies/";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link = "/actor/linda-hamilton/";
    const title = "Linda Hamilton Archives - Test WP Site";

    before(() => cy.visit(`http://localhost:3001${link}?name=yoast-package`));
    checkTitle(title);
    checkMetaTags();
  });
});
