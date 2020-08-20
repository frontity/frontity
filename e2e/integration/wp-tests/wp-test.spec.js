describe("WP test", () => {
  beforeEach(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
    cy.visit("http://localhost:3001?name=e2e-wp-test");
  });

  it("should work", () => {
    // the path is relative to the e2e directory
    cy.task("loadDatabase", { path: "./data/db.sql" });
    cy.task("installPlugin", { name: "wordpress-seo" });
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
