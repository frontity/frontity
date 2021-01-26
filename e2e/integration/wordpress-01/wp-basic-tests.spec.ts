import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("WordPress REST API", () => {
  it("archives should work", () => {
    cy.visit("http://localhost:3001?frontity_name=wp-basic-tests");
    cy.get("[data-test-id='1']").contains("/hello-world");
  });

  it("posts should work", () => {
    cy.visit("http://localhost:3001/hello-world?frontity_name=wp-basic-tests");
    cy.get("[data-test-id='post']").contains("Hello world");
  });
});

describe("WordPress plugins", () => {
  before(() => {
    task("installPlugin", { name: "code-snippets" });
    task("loadDatabase", {
      path: "./wp-data/wp-basic-tests/code-snippets.sql",
    });
  });

  after(() => {
    task("resetDatabase");
    task("removeAllPlugins");
  });

  it("should have a text injected by the Code Snippets plugin", () => {
    cy.visit("http://localhost:8080/");
    cy.get("[data-test-id='code-snippet']").contains(
      "Hello from WordPress plugin"
    );
  });
});
