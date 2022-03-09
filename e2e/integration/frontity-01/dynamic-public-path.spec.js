import expect from "expect";

describe("Dynamic Public Path", () => {
  describe("Frontity Settings", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3001/dynamic-public-path/");
    });

    it("should be able to render elements from dynamic components", () => {
      cy.get("[data-test-id='dynamic-div']").should(
        "have.text",
        "I am the Dynamic component"
      );
    });

    it("should be able to render other static assets", () => {
      cy.get("[data-test-id='image']")
        .should("have.attr", "src")
        .and("contain", "/dynamic-public-path/custom-static/images/");
      cy.get("[data-test-id='image']")
        .should("be.visible")
        .and(($img) => {
          expect($img[0].naturalWidth).toBeGreaterThan(0);
        });
    });

    it("should be able to use javascript from dynamic components", () => {
      cy.get("[data-test-id='toggle-div']").should("have.text", "OFF");
      cy.get("[data-test-id='toggle-button']").click();
      cy.get("[data-test-id='toggle-div']").should("have.text", "ON");
    });
  });

  describe("Frontity Query Option", () => {
    beforeEach(() => {
      cy.visit(
        "http://localhost:3001/dynamic-public-path-2/?frontity_public_path=http://localhost:3001/dynamic-public-path/custom-static"
      );
    });

    it("should be able to render elements from dynamic components", () => {
      cy.get("[data-test-id='dynamic-div']").should(
        "have.text",
        "I am the Dynamic component"
      );
    });

    it("should be able to render other static assets", () => {
      cy.get("[data-test-id='image']")
        .should("have.attr", "src")
        .and(
          "contain",
          "http://localhost:3001/dynamic-public-path/custom-static/images/"
        );
      cy.get("[data-test-id='image']")
        .should("be.visible")
        .and(($img) => {
          expect($img[0].naturalWidth).toBeGreaterThan(0);
        });
    });

    it("should be able to use javascript from dynamic components", () => {
      cy.get("[data-test-id='toggle-div']").should("have.text", "OFF");
      cy.get("[data-test-id='toggle-button']").click();
      cy.get("[data-test-id='toggle-div']").should("have.text", "ON");
    });
  });
});
