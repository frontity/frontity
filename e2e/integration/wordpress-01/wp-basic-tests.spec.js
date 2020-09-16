describe("WordPress REST API", () => {
  it("archives should work", () => {
    cy.visit("http://localhost:3001?name=wp-basic-tests");
    cy.get("[data-test-id='1']").contains("/hello-world");
  });

  it("posts should work", () => {
    cy.visit("http://localhost:3001/hello-world?name=wp-basic-tests");
    cy.get("[data-test-id='post']").contains("Hello world");
  });
});

describe("WordPress plugins", () => {
  before(() => {
    cy.task("installPlugin", { name: "code-snippets" });
    cy.task("loadDatabase", {
      path: "./wp-data/wp-basic-tests/code-snippets.sql",
    });
  });

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  it("should have a text injected by the Code Snippets plugin", () => {
    cy.visit("http://localhost:8080/");
    cy.get("[data-test-id='code-snippet']").contains(
      "Hello from WordPress plugin"
    );
  });

  it("dummy test, otherwise the previous test doesn't run", () => {
    // I'm not sure why, but if I remove this test, the previous one doesn't run
    // and if it fails, Cypress does not complain. I guess it is a bug in
    // Cypress.
  });
});
