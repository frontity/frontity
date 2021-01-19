// This allows us to get TypeScript Intellisense and autocompletion.
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

Cypress.config({
  experimentalFetchPolyfill: false,
} as any);

describe("Redirections", () => {
  before(() => {
    task("installPlugin", { name: "redirection" });
    task("loadDatabase", {
      path: "./wp-data/301-redirections/dump.sql",
    });
  });

  it("Should redirect when loading the page directly", () => {
    cy.visit("http://localhost:3001/hello-world/?frontity_name=redirections");

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should handle query params in a redirection", () => {
    cy.visit(
      "http://localhost:3001/hello-world/?frontity_name=redirections&redirections=all"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/?redirections=all"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should handle query params in a redirection, and NOT redirect if NOT matching the RegExp", () => {
    cy.visit(
      "http://localhost:3001/hello-world/?frontity_name=redirections&redirections=RegExp:/some-post",
      { failOnStatusCode: false }
    );

    // The RegExp is URI-encoded.
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world/?redirections=RegExp%3A%2Fsome-post"
    );
    cy.get("#404").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should redirect when navigating on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    // Go to the "redirected" page.
    cy.get("#open-post").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("The back and forward button should work fine when navigating", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    // Go to the "redirected" page.
    cy.get("#open-post").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");

    // Go back to the homepage.
    cy.go("back");
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.get("#archive").should("exist");
    cy.get("#link-counter").should("contain.text", "4");

    // Go to the "redirected" page again using the link.
    cy.get("#open-post").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "5");

    // Go back to the homepage.
    cy.go("back");
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.get("#archive").should("exist");
    cy.get("#link-counter").should("contain.text", "6");

    // Go to the "redirected" page again using the forward button.
    cy.go("forward");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "7");
  });

  it("Should not trigger a redirection when you prefetch the data for a (redirected) post", () => {
    cy.visit(
      "http://localhost:3001/post-with-prefetch/?frontity_name=redirections"
    );

    // We need to wait to see if the redirection is triggered.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);

    cy.location("href").should(
      "eq",
      "http://localhost:3001/post-with-prefetch/"
    );

    cy.get("#post").should("contain.text", "Post with prefetch");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with a double redirection on the server", () => {
    cy.visit("http://localhost:3001/initial-url/?frontity_name=redirections");

    cy.location("href").should("eq", "http://localhost:3001/final-url/");

    cy.get("#post").should("contain.text", "Post: Doubly redirected post");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with a double redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#doubly-redirected").click();

    cy.location("href").should("eq", "http://localhost:3001/final-url/");
    cy.get("#post").should("contain.text", "Post: Doubly redirected post");
    // This is 3 instead of 4 because the browser hides all the intermediate
    // redirections and we only see the final one.
    cy.get("#link-counter").should("contain.text", "3");
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
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with a 302 redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#302-redirection").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("Should work with a 307 redirection on the server", () => {
    cy.visit(
      "http://localhost:3001/hello-world-307?frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  // The 307 Redirections are failing due to a CORS issue on the client so this
  // test is going to be disabled for the time being.
  // eslint-disable-next-line
  it.skip("Should work with a 307 redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#307-redirection").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("Should work with a 308 redirection on the server", () => {
    cy.visit(
      "http://localhost:3001/hello-world-308?frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with a 308 redirection on the client", () => {
    cy.visit("http://localhost:3001?frontity_name=redirections");

    cy.get("#308-redirection").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("Should work when we create a redirection using the 'Ignore and pass parameters to the target' option in the server", () => {
    cy.visit(
      "http://localhost:3001/should-preserve-query?frontity_name=redirections&a=1&b=2"
    );

    // Note that the queries are preserved and sorted after the redirection.
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/?a=1&b=2"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work when we create a redirection using the 'Ignore and pass parameters to the target' option in the client", () => {
    cy.visit("http://localhost:3001/?frontity_name=redirections");

    cy.get("#should-preserve-query").click();

    // Note that the queries are preserved and sorted after the redirection.
    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/?a=1&b=2"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("Should work with redirections that match a query string in the backend", () => {
    cy.visit(
      "http://localhost:3001/match-query/?key=value&frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/?key=value"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with redirections defined directly in the state on the server", () => {
    cy.visit(
      "http://localhost:3001/redirected-url/?frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with redirections defined directly in the state on the client", () => {
    cy.visit("http://localhost:3001/?frontity_name=redirections");

    cy.get("#redirection-stored-in-state").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "2");
  });

  it("Should work with redirections defined as custom handlers in the server", () => {
    cy.visit(
      "http://localhost:3001/urls-with-redirections/test/?frontity_name=redirections"
    );

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "1");
  });

  it("Should work with redirections defined as custom handlers in the client", () => {
    cy.visit("http://localhost:3001/?frontity_name=redirections");

    cy.get("#redirection-in-handler").click();

    cy.location("href").should(
      "eq",
      "http://localhost:3001/hello-world-redirected/"
    );
    cy.get("#post").should("exist");
    cy.get("#link-counter").should("contain.text", "3");
  });

  it("Should redirect to an external domain on the server", () => {
    cy.visit(
      "http://localhost:3001/external-redirect/?frontity_name=redirections"
    );

    cy.location("href").should("eq", "https://frontity.org/");
  });

  it("Should redirect to an external domain on the client", () => {
    cy.visit("http://localhost:3001/?frontity_name=redirections");

    cy.get("#external-redirection").click();

    cy.location("href").should("eq", "https://frontity.org/");
  });
});
