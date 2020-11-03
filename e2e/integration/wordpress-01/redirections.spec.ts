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
    cy.get("#post").should("exist");
  });

  it("Should redirect when navigating on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    // Go to the "redirected" page
    cy.get("#open-post").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
  });

  it("The back and forward button should work fine when navigating ", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    // Go to the "redirected" page
    cy.get("#open-post").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");

    // go back to the homepage
    cy.go("back");
    cy.location("href").should("eq", "http://localhost:3001/");

    // go to the "redirected" page again.
    cy.get("#open-post").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
  });

  it("Should work when you prefetch the data for a (redirected) post", () => {
    cy.visit(
      "http://localhost:3001/post-with-prefetch/?frontity_name=redirections"
    );

    // We need to wait for the redirection
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.location("href").should(
      "eq",
      "http://localhost:3001/post-with-prefetch/"
    );

    cy.get("#post").should("contain.text", "Post with prefetch");
  });

  it("Should work with a double redirection on the server", () => {
    cy.visit("http://localhost:3001/initial-url/?frontity_name=redirections");

    cy.location("href").should("eq", "http://localhost:3001/final-url/");

    cy.get("#post").should("contain.text", "Post: Doubly redirected post");
  });

  it("Should work with a double redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#doubly-redirected").click();

    cy.location("href").should("eq", "http://localhost:3001/final-url/");
    cy.get("#post").should("contain.text", "Post: Doubly redirected post");
  });

  it("Should work with a 302 redirection on the server", () => {
    cy.visit(
      "http://localhost:3001/hello-world-302?frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
  });

  it("Should work with a 302 redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#302-redirection").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
  });
});
