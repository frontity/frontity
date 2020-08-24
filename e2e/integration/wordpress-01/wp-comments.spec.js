describe("wp-comments", () => {
  before(() => {
    cy.task("installPlugin", { name: "code-snippets" });
    cy.task("loadDatabase", {
      path: "./wp-data/wp-comments/code-snippets.sql",
    });
  });

  // after(() => {
  //   cy.task("resetDatabase");
  //   cy.task("removeAllPlugins");
  // });

  it("should work", () => {
    cy.visit("http://localhost:3001?name=wp-comments");

    cy.get("#send-comment").click();

    cy.get("#form").contains("hello");
  });
});
