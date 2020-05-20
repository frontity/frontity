import expect from "expect";

describe("Robots", () => {
  it("should respect the robots.txt file", () => {
    cy.request("http://localhost:3001/robots.txt").as("robots");

    cy.get("@robots").should((response) => {
      expect(response.body).toContain("User-agent: google\nAllow: /");
    });
  });
});
