// This allows us to get TypeScript Intellisense and autocompletion.
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("Special characters in the URL", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/post-with-special-characters/dump.sql",
    });
  });

  it("Should load the post", () => {
    cy.visit("http://localhost:3001?frontity_name=wp-basic-tests");
    cy.get("[data-test-id='/test♯post😊/']").click();

    cy.get("[data-test-id='post']").contains("Post: test♯post😊");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/test%e2%99%afpost%f0%9f%98%8a/"
    );
  });
});
