describe("Preview plugin", () => {
  /**
   * TEST CASES
   * (logged in & not logged in):
   *
   * Preview with an unpublished post.
   * Preview with a published post.
   * Preview with an edited post.
   * Preview with an unpublished page.
   * Preview with a published page.
   * Preview with an edited page.
   * Preview with unpublished custom post type.
   * Preview with published custom post type.
   * Preview with edited custom post type.
   *
   *
   */
  before(() => {
    cy.task("removeAllPlugins");
    cy.task("installPlugin", { name: "custom-post-type-ui" });
    cy.task("installPlugin", {
      name:
        "https://github.com/frontity/frontity-embedded-proof-of-concept/archive/preview-poc.zip",
    });
    cy.task("loadDatabase", {
      path: "./wp-data/preview.sql",
    });
  });

  // after(() => {
  //   cy.task("resetDatabase");
  //   cy.task("removeAllPlugins");
  // });

  /**
   * Tests for posts.
   */

  describe("Logged in WordPress", () => {
    before(() => {
      cy.visit("http://localhost:8080/wp-login.php");
      cy.get("input#user_login").type("admin");
      cy.get("input#user_pass").type("password");
      cy.get("input#wp-submit").click();
    });

    it("a published post should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/?preview=true");
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post draft should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/?preview=true");
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post revision should be accessible", () => {});
  });
});
