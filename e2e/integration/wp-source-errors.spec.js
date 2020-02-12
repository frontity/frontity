import expect from "expect";

describe("Status codes", () => {
  it("should return a 200 status code", async () => {
    const res = await cy.request(
      "http://localhost:3001/?name=wp-source-errors"
    );
    expect(res.status).toBe(200);
  });

  it.skip("should return a 404 status code", async () => {
    const res404 = await cy.request(
      "http://localhost:3001/404?name=wp-source-errors"
    );
    expect(res404.status).toBe(404);
  });

  it.skip("should return a 500 status code", async () => {
    const res500 = await cy.request(
      "http://localhost:3001/500?name=wp-source-errors"
    );
    expect(res500.status).toBe(500);
  });
});

describe("Data", () => {
  it("should have data populated correctly without errors", () => {
    cy.visit("http://localhost:3001/?name=wp-source-errors");
    cy.get("[data-test-id='isError']").should("contain.text", "false");
  });

  it("should have data populated correctly with 404 errors", () => {
    cy.visit("http://localhost:3001/404?name=wp-source-errors");
    cy.get("[data-test-id='isError']").should("contain.text", "true");
    cy.get("[data-test-id='is404']").should("contain.text", "true");
    cy.get("[data-test-id='status']").should("contain.text", "404");
  });

  it("should have data populated correctly with 500 errors", () => {
    cy.visit("http://localhost:3001/500?name=wp-source-errors");
    cy.get("[data-test-id='isError']").should("contain.text", "true");
    cy.get("[data-test-id='is404']").should("contain.text", "false");
    cy.get("[data-test-id='status']").should("contain.text", "500");
  });
});
