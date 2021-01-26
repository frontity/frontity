import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("Tiny Router", () => {
  before(() => {
    // Go first to the main URL to avoid a restart when the WordPress site is
    // visited (baseUrl is different here).
    cy.visit("http://localhost:8080");
    task("removeAllPlugins");
    task("installPlugin", { name: "code-snippets" });
    task("installPlugin", {
      name:
        "https://github.com/frontity/frontity-embedded-proof-of-concept/archive/master.zip",
    });
    task("loadDatabase", {
      path: "./wp-data/tiny-router/client-server-mismatch.sql",
    });
  });

  it("should work if there's a link mismatch between the server and the client", () => {
    cy.visit("http://localhost:8080/?utm=client&frontity_name=wp-basic-tests");

    // This test only checks that the link has actually changed in the server.
    cy.window()
      .its("frontity")
      .its("state")
      .its("frontity")
      .its("initialLink")
      .should("equal", "/?utm=SERVER");

    // The "utm" parameter should be respected.
    cy.window()
      .its("frontity")
      .its("state")
      .its("router")
      .its("link")
      .should("equal", "/?utm=client");

    // The home should render correctly.
    cy.get("[data-test-id='1']").should("contain.text", "/hello-world");

    // Go to "/hello-world/"
    cy.get("[data-test-id='/hello-world/'").click();
    cy.get("[data-test-id='post']").should("contain.text", "Hello world");

    // Go back to the home. It should render the home again.
    cy.go("back");

    cy.window()
      .its("frontity")
      .its("state")
      .its("router")
      .its("link")
      .should("equal", "/?utm=client");

    cy.location().its("search").should("equal", "?utm=client");

    cy.get("[data-test-id='1']").should("contain.text", "/hello-world");
  });
});
