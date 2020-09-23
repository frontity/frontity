describe("Preview plugin", () => {
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

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  /**
   * Tests for posts.
   */
  describe("Logged in WordPress", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/wp-login.php");
      cy.get("input#user_login").type("admin");
      cy.get("input#user_pass").type("password");
      cy.get("input#wp-submit").click();
    });

    it("a published post should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/");
      cy.get('h1[class*="Title"]').should("have.text", "Hello world!");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!"
      );
    });

    it("a post revision should be accessible", () => {
      cy.visit("http://localhost:8080/hello-world/?preview_id=1&preview=true");
      cy.get('h1[class*="Title"]').should("have.text", "Hello world! (edited)");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "The content of this post was modified."
      );
    });

    it("a post draft should be accessible", () => {
      cy.visit("http://localhost:8080/?p=5&preview=true");
      cy.get('h1[class*="Title"]').should("have.text", "This is a draft");
      cy.get('div[class*="Content"] > p').should(
        "have.text",
        "This post is just a draft and it should not be publicly accessible."
      );
    });
  });
});
