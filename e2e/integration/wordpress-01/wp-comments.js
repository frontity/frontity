describe("wp-comments", () => {
  beforeEach(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
    cy.visit("http://localhost:3001?name=wp-comments");
  });

  it("should work", () => {
    cy.task("installPlugin", { name: "code-snippets" });

    // the path is relative to the e2e directory
    cy.task("loadDatabase", { path: "./fixtures/wp-comments.sql" });
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
