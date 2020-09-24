describe("Preview plugin", () => {
  before(() => {
    // Go first to the main URL to avoid a restart when the WordPress site is
    // visited (baseUrl is different here).
    cy.visit("http://localhost:8080");
    cy.task("installPlugin", { name: "custom-post-type-ui" });
    cy.task("installPlugin", {
      name:
        "https://github.com/frontity/frontity-embedded-proof-of-concept/archive/preview-poc.zip",
    });
    cy.task("loadDatabase", {
      path: "./wp-data/preview.sql",
    });
  });

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  /**
   * Tests for preview while logged in.
   */
  describe("Logged in WordPress", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/wp-login.php");
      cy.get("input#user_login")
        .then(([input]) => {
          input.value = "admin";
        })
        .should("have.value", "admin");
      cy.get("input#user_pass")
        .then(([input]) => {
          input.value = "password";
        })
        .should("have.value", "password");
      cy.get("input#wp-submit").click();
    });

    it("a published post should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post revision should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/?preview_id=1&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Hello world! (edited)");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "The content of this post was modified."
      );
    });

    it("a post draft should be accessible", () => {
      cy.visit("http://localhost:8080/?p=5&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "This is a draft");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This post is just a draft and it should not be publicly accessible."
      );
    });

    it("a published page should be accessible", () => {
      cy.visit("http://localhost:8080/sample-page/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Sample Page");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is an example page."
      );
    });

    it("a page revision should be accessible", () => {
      cy.visit("http://localhost:8080/sample-page/?preview_id=2&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Sample Page (edited)");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This page was modified."
      );
    });

    it("a page draft should be accessible", () => {
      cy.visit("http://localhost:8080/?page_id=9&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "This is a page draft");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This page is just a draft and it should not be publicly accessible."
      );
    });

    it("a published CPT should be accessible", () => {
      cy.visit("http://localhost:8080/movie/published-movie/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Published movie");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is a published movie."
      );
    });

    it("a CPT revision should be accessible", () => {
      cy.visit(
        "http://localhost:8080/movie/published-movie/?preview_id=16&preview=true"
      );
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should(
        "have.text",
        "Published movie (edited)"
      );
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This movie was modified."
      );
    });

    it("a CPT draft should be accessible", () => {
      cy.visit("http://localhost:8080/?post_type=movie&p=17&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Movie draft");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is a movie draft."
      );
    });
  });

  describe("Logged out from WordPress", () => {
    it("a published post should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post revision should not be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/?preview_id=1&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post draft should not be accessible", () => {
      cy.request({
        url: "http://localhost:8080/?p=5&preview=true",
        failOnStatusCode: false,
      }).should("have.property", "status", 401);
    });

    it("a published page should be accessible", () => {
      cy.visit("http://localhost:8080/sample-page/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Sample Page");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is an example page."
      );
    });

    it("a page revision should not be accessible", () => {
      cy.visit("http://localhost:8080/sample-page/?preview_id=2&preview=true");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should come from the published version.
      cy.get('h1[class*="Title"]').should("have.text", "Sample Page");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is an example page."
      );
    });

    it("a page draft should not be accessible", () => {
      cy.request({
        url: "http://localhost:8080/?page_id=9&preview=true",
        failOnStatusCode: false,
      }).should("have.property", "status", 401);
    });

    it("a published CPT should be accessible", () => {
      cy.visit("http://localhost:8080/movie/published-movie/");
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should be correct.
      cy.get('h1[class*="Title"]').should("have.text", "Published movie");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is a published movie."
      );
    });

    it("a CPT revision should not be accessible", () => {
      cy.visit(
        "http://localhost:8080/movie/published-movie/?preview_id=16&preview=true"
      );
      // Frontity should have been loaded.
      cy.window().should("have.property", "frontity");
      // Title and content should come from the published version.
      cy.get('h1[class*="Title"]').should("have.text", "Published movie");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This is a published movie."
      );
    });

    it("a CPT draft should not be accessible", () => {
      cy.request({
        url: "http://localhost:8080/?post_type=movie&p=17&preview=true",
        failOnStatusCode: false,
      }).should("have.property", "status", 401);
    });
  });
});
