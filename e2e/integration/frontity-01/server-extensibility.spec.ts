describe("Server Extensibility", () => {
  it("should render the root component", () => {
    cy.visit("http://localhost:3001/?frontity_name=server-extensibility");

    cy.get('[data-test-id="frontity-root"]').should(
      "contain",
      "Server Extensibility"
    );
  });

  it("should get the robots.txt file from the custom middleware using `get` from `koa-route` and handler signature `fn({ctx})", () => {
    cy.request("/robots-one.txt?frontity_name=server-extensibility")
      .its("body")
      .should(
        "equal",
        "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml"
      );
  });

  it("should get the robots.txt file from the custom middleware using `get` from `koa-route` and handler signature `fn(ctx)", () => {
    cy.request("/robots-two.txt?frontity_name=server-extensibility")
      .its("body")
      .should(
        "equal",
        "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml"
      );
  });

  it("should change the headers of the request using both signatures `fn(ctx, next)` and `fn({ctx, next})`", () => {
    cy.request("/?frontity_name=server-extensibility")
      .its("headers")
      .then((headers) => {
        assert.equal(headers["x-frontity-test-one"], "One");
        assert.equal(headers["x-frontity-test-two"], "Two");
        assert.equal(headers["x-frontity-test-three"], "Three");
      });
  });

  it("should have access to the state", () => {
    cy.request("/state?frontity_name=server-extensibility")
      .its("body")
      .should("equal", "https://frontity.server.extensibility");
  });
});
