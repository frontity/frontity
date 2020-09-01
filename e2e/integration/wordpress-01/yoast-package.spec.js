describe("Yoast Package", () => {
  // before(() => {
  //   cy.task("installPlugin", { name: "wordpress-seo" });
  //   cy.task("installPlugin", { name: "custom-post-type-ui" });
  //   cy.task("loadDatabase", {
  //     path: "./wp-data/yoast-package/yoast-with-cpt.sql",
  //   });
  // });

  // after(() => {
  //   cy.task("resetDatabase");
  //   cy.task("removeAllPlugins");
  // });

  /**
   * Run a set of test to ensure the correct meta tags are being rendered.
   *
   * This way, snapshots are generated with a meaningful name and are easy to
   * read and check by a human being.
   *
   * @remarks The <title> tag is not tested using snapshots. That's because the
   * plugin we are using to generate snapshots gives an error when trying to
   * generate a snapshot for that tag (it also doesn't work well with strings).
   *
   * @param link - Page link that will be visited in all tests.
   */
  const checkMetaSnapshots = (link) => {
    it("should render the correct canonical URL", () => {
      cy.visit(link);
      cy.get('link[rel="canonical"]').toMatchSnapshot();
    });

    it("should render the robots tag", () => {
      cy.visit(link);
      cy.get('meta[name="robots"]').toMatchSnapshot();
    });

    it("should render the Open Graph tags", () => {
      cy.visit(link);
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
      cy.visit(link);
      cy.get('meta[name^="twitter:"]').each((meta) => {
        cy.wrap(meta).toMatchSnapshot();
      });
    });

    it("should render the schema tag", () => {
      cy.visit(link);
      cy.get('script[type="application/ld+json"]').toMatchSnapshot();
    });
  };

  /**
   * Tests for posts.
   */
  describe("Post", () => {
    const link = "http://localhost:3001/hello-world?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should(
        "contain",
        "Hello World From Yoast! - Test WP Site"
      );
    });
    checkMetaSnapshots(link);
  });

  /**
   * Tests for pages.
   */
  describe("Page", () => {
    const link = "http://localhost:3001/sample-page?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should("contain", "Sample Page - Test WP Site");
    });
    checkMetaSnapshots(link);
  });

  /**
   * Tests for categories.
   */
  describe("Category", () => {
    const link = "http://localhost:3001/category/nature?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should("contain", "Nature Archives - Test WP Site");
    });
    checkMetaSnapshots(link);
  });

  /**
   * Tests for tags.
   */
  describe("Tag", () => {
    const link = "http://localhost:3001/tag/japan?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should("contain", "Japan Archives - Test WP Site");
    });
    checkMetaSnapshots(link);
  });

  /**
   * Tests for authors.
   */
  describe("Author", () => {
    const link = "http://localhost:3001/author/luisherranz?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should("contain", "luisherranz, Author at Test WP Site");
    });
    checkMetaSnapshots(link);
  });

  // /**
  //  * Tests for the homepage.
  //  */
  // describe("Homepage", () => {
  //   const link = "http://localhost:3001/?name=yoast-package";

  //   it("should render the correct title", () => {
  //     cy.visit(link);
  //     cy.get("title").should("contain", "Sample Page - Test WP Site");
  //   });
  //   checkMetaSnapshots(link);
  // });

  /**
   * Tests for custom post types.
   */
  describe("CPT", () => {
    const link =
      "http://localhost:3001/movie/the-terminator/?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should("contain", "The Terminator - Test WP Site");
    });
    checkMetaSnapshots(link);
  });

  // /**
  //  * Tests for archive of custom post types.
  //  */
  // describe("CPT (archive)", () => {
  //   const link = "http://localhost:3001/movies/?name=yoast-package";

  //   it("should render the correct title", () => {
  //     cy.visit(link);
  //     cy.get("title").should("contain", "Movies Archive - Test WP Site");
  //   });
  //   checkMetaSnapshots(link);
  // });

  /**
   * Tests for archive of custom post types.
   */
  describe("Custom Taxonomy", () => {
    const link =
      "http://localhost:3001/actor/linda-hamilton/?name=yoast-package";

    it("should render the correct title", () => {
      cy.visit(link);
      cy.get("title").should(
        "contain",
        "Linda Hamilton Archives - Test WP Site"
      );
    });
    checkMetaSnapshots(link);
  });
});
