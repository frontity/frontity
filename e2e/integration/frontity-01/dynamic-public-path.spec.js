describe("Dynamic Public Path", () => {
  describe("Frontity Settings", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3001/dynamic-public-path/");
    });

    it("should be able to render elements from dynamic components", () => {
      cy.get("[data-test-id='dynamic-div']").should(
        "have.text",
        "I am the Dynamic1 component"
      );
    });

    it("should be able to use javascript from dynamic components", () => {
      cy.get("[data-test-id='toggle-div']").should("have.text", "OFF");
      cy.get("[data-test-id='toggle-button']").click();
      cy.get("[data-test-id='toggle-div']").should("have.text", "ON");
    });
  });

  // describe("Frontity Query Option", () => {
  //   beforeEach(() => {
  //     cy.visit(
  //       "http://localhost:3001/dynamic-public-path-2/?frontity_public_path=http://localhost:3001/dynamic-public-path-2/other-static"
  //     );
  //   });

  //   it("should be able to render elements from dynamic components", () => {
  //     cy.get("[data-test-id='dynamic-div']").should(
  //       "have.text",
  //       "I am the Dynamic1 component"
  //     );
  //   });

  //   it("should be able to use javascript from dynamic components", () => {
  //     cy.get("[data-test-id='toggle-div']").should("have.text", "OFF");
  //     cy.get("[data-test-id='toggle-button']").click();
  //     cy.get("[data-test-id='toggle-div']").should("have.text", "ON");
  //   });
  // });
});