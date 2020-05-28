import expect from "expect";

// Remove the file before each run to ensure that we start with a clean project
// We pass the -f option so that it doesn't throw the error in case the file don't exist
beforeEach(() => {
  cy.exec("rm -f project/robots.txt");
});

// Also clean up after each test run so that we don't pollute the repo
afterEach(() => {
  cy.exec("rm -f project/robots.txt");
});

describe("Robots", () => {
  it("should respond with a default robots.txt", () => {
    cy.request("http://localhost:3001/robots.txt").as("robots");

    cy.get("@robots").should((response) => {
      expect(response.body).toContain("User-agent: *\nAllow: /");
    });
  });

  it("should respect the robots.txt file if present", () => {
    cy.writeFile("project/robots.txt", "User-agent: google\nAllow: /");

    cy.request("http://localhost:3001/robots.txt").as("robots");

    cy.get("@robots").should((response) => {
      expect(response.body).toContain("User-agent: google\nAllow: /");
    });
  });
});
