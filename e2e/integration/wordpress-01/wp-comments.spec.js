describe("wp-comments", () => {
  before(() => {
    // cy.task("installPlugin", { name: "code-snippets" });
    cy.task("loadDatabase", {
      path: "./wp-data/wp-comments/code-snippets.sql",
    });
  });

  // after(() => {
  //   cy.task("resetDatabase");
  //   cy.task("removeAllPlugins");
  // });

  const getComments = () =>
    cy.window().its("frontity").its("state").its("comments").its("forms");

  it("should work in the basic case", () => {
    cy.visit("http://localhost:3001?name=wp-comments");

    cy.get("#send-comment").click();

    getComments()
      .its(1)
      .should("have.nested.property", "submitted.isError", false);
    getComments()
      .its(1)
      .should("have.nested.property", "submitted.isOnHold", true);
    getComments()
      .its(1)
      .should("have.nested.property", "submitted.isApproved", false);
    getComments().its(1).should("have.nested.property", "submitted.id", 2);
  });
});
