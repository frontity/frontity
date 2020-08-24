describe("Fonts", () => {
  it("should not load any fonts", () => {
    cy.visit("http://localhost:3001/empty?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the woff-1 font", () => {
    cy.visit("http://localhost:3001/woff-1?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the woff-2 font", () => {
    cy.visit("http://localhost:3001/woff-2?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the ttf font", () => {
    cy.visit("http://localhost:3001/ttf?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });

  it("should load the all fonts", () => {
    cy.visit("http://localhost:3001/?name=fonts");
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='div-with-font']").toMatchImageSnapshot();
  });
});
