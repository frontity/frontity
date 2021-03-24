// Remove the file before each run to ensure that we start with a clean project.
// We pass the -f option so that it doesn't throw the error in case the file
// don't exist.
beforeEach(() => {
  cy.exec("rm -f project/robots.txt");
});

// Also clean up after each test run so that we don't pollute the repo.
afterEach(() => {
  cy.exec("rm -f project/robots.txt");
});

describe("Robots", () => {
  it("should respond with a default robots.txt", () => {
    cy.request("/robots.txt")
      .its("body")
      .should("equal", "User-agent: *\nAllow: /");
  });

  it("should respect the robots.txt file if present", () => {
    const robots = "User-agent: google\nAllow: /";
    cy.writeFile("project/robots.txt", robots);
    cy.request("/robots.txt").its("body").should("equal", robots);
  });
});
