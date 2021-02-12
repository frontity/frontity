import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("WP Source errors", () => {
  before(() => {
    task("installPlugin", { name: "code-snippets" });
    task("loadDatabase", {
      path: "./wp-data/wp-source/wp-source-errors.sql",
    });
  });

  after(() => {
    task("resetDatabase");
    task("removeAllPlugins");
  });

  describe("Status codes", () => {
    it("should return a 200 status code", () => {
      cy.request("http://localhost:3001/?frontity_name=wp-source-errors")
        .its("status")
        .should("equal", 200);
    });

    it("should return a 404 status code", () => {
      cy.request({
        url:
          "http://localhost:3001/?statusCode=404&frontity_name=wp-source-errors",
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 404);
    });

    it("should return a 500 status code", () => {
      cy.request({
        url:
          "http://localhost:3001/?statusCode=500&frontity_name=wp-source-errors",
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 500);
    });
  });

  describe("Data", () => {
    it("should have data populated correctly without errors", () => {
      cy.visit("http://localhost:3001/?frontity_name=wp-source-errors");
      cy.get("[data-test-id='isError']").should("contain.text", "false");
    });

    it("should have data populated correctly with 404 errors", () => {
      cy.visit({
        url:
          "http://localhost:3001/?statusCode=404&frontity_name=wp-source-errors",
        failOnStatusCode: false,
      });
      cy.get("[data-test-id='isError']").should("contain.text", "true");
      cy.get("[data-test-id='is404']").should("contain.text", "true");
      cy.get("[data-test-id='status']").should("contain.text", "404");
    });

    it("should have data populated correctly with 500 errors", () => {
      cy.visit({
        url:
          "http://localhost:3001/?statusCode=500&frontity_name=wp-source-errors",
        failOnStatusCode: false,
      });
      cy.get("[data-test-id='isError']").should("contain.text", "true");
      cy.get("[data-test-id='is404']").should("contain.text", "false");
      cy.get("[data-test-id='status']").should("contain.text", "500");
    });
  });
});
