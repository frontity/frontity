describe("Fonts", () => {
  it("should not load any fonts", () => {
    cy.visit("http://localhost:3000/empty?name=fonts");
    cy.get("[data-test-id='div-with-font']").should(
      "have.css",
      "font-family",
      "Aclonica"
    );
  });
});
