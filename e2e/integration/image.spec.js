/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe("Image (with native lazy-load)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image");
  });

  it("should be showing an image", () => {
    cy.get(".test-image-1").should(([img]) => {
      expect(img).to.be.visible;
      expect(img).to.have.property("alt", "gullfoss");
      expect(img).to.have.property("loading", "auto");
    });

    cy.get(".test-image-2").should(([img]) => {
      expect(img).to.be.visible;
      expect(img).to.have.property("alt", "gullfoss");
      expect(img).to.have.property("loading", "lazy");
    });
  });
});

describe("Image (with Intersection Observer)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image", {
      onBeforeLoad(win) {
        // Remove the "loading" prop from the HTMLImageElement prototype
        Object.defineProperty(win.HTMLImageElement.prototype, "loading", {});
        delete win.HTMLImageElement.prototype.loading;
      }
    });
  });

  it("should be showing an image", () => {
    cy.get(".test-image-1").should("be.visible");
  });
});

describe("Image (without lazy-load)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image");
  });

  it("should be showing an image", () => {
    cy.get(".test-image-1").should("be.visible");
  });
});
