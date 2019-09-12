describe("Head", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?site=head");
  });

  it("should be able to have a title", () => {
    cy.get("title").should("have.text", "The Title");
  });

  it("should be able to have a meta for description", () => {
    cy.get("meta[name='description']").should(
      "have.attr",
      "content",
      "The Description"
    );
  });

  it("should be able to have html attributes", () => {
    cy.get("html").should("have.attr", "lang", "en");
  });

  it("should be able to execute javascript in a script tag", () => {
    cy.window().should("have.property", "scriptTest", "pass");
  });

  it("should be able to have links", () => {
    cy.get("link[rel='canonical']").should(
      "have.attr",
      "href",
      "http://mysite.com/example"
    );
  });

  it("should be able to change body attributes", () => {
    cy.get("body").should("have.attr", "class", "new-class");
  });

  it("should be able to have nonscripts", () => {
    cy.get("noscript").should("contain.text", "foo.csss");
  });

  it("should be able to add inline CSS", () => {
    cy.get("body").should("have.css", "background-color");
  });
});
