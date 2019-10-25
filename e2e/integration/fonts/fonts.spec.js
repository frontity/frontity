describe("Fonts", () => {
  it("should not load any fonts", () => {
    cy.visit("http://localhost:3001/empty?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the eot-1 font", () => {
    cy.visit("http://localhost:3001/eot-1?name=fonts");
    // Eot doesn't work in Chrome so we just check if the data has been added.
    cy.get("style[amp-custom]").contains("base64");
  });

  it("should load the eot-2 font", () => {
    cy.visit("http://localhost:3001/eot-2?name=fonts");
    // Eot doesn't work in Chrome so we just check if the data has been added.
    cy.get("style[amp-custom]").contains("base64");
  });

  it("should load the woff-1 font", () => {
    cy.visit("http://localhost:3001/woff-1?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the woff-2 font", () => {
    cy.visit("http://localhost:3001/woff-2?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the ttf font", () => {
    cy.visit("http://localhost:3001/ttf?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the svg font", () => {
    cy.visit("http://localhost:3001/svg?name=fonts");
    // SVG fonts don't work in Chrome so we just check if the data has been added.
    cy.get("style[amp-custom]").contains(
      'url("/static/images/aclonica-v10-latin-regular'
    );
  });

  it("should load the all fonts", () => {
    cy.visit("http://localhost:3001/?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });
});
