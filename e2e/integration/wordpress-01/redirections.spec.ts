// This allows us to get TypeScript Intellisense and autocompletion.
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("Preview plugin", () => {
  before(() => {
    task("installPlugin", { name: "redirection" });

    task("loadDatabase", {
      path: "./wp-data/301-redirections/dump.sql",
    });
  });

  it("Should should redirect when loading the page directly", () => {
    cy.visit("http://localhost:3001/hello-world/?frontity_name=redirections");

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
  });

  it("Should redirect when navigating on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#open-post").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
  });
});
