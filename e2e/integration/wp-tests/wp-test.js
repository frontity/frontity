describe("WP test", () => {
  it("should work", () => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
    cy.task("installPlugin", { name: "code-snippets" });
    cy.task("loadDatabase", { path: "./fixtures/wp-comments.sql" });

    cy.visit("http://localhost:3001?name=wp-comments");

    // the path is relative to the e2e directory
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
