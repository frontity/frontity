import expect from "expect";

if (!Cypress.env("HEADLESS")) {
  describe("Native iframe lazy-load", () => {
    beforeEach(() => {
      cy.viewport(360, 640);
      cy.visit("http://localhost:3001?name=iframe");
    });

    it("native lazy-load should exist", () => {
      return cy
        .window()
        .its("HTMLIframeElement")
        .then(iframeElement => {
          expect("loading" in iframeElement.prototype).toBe(true);
        });
    });

    it("iframe with loading=lazy attribute and value should exist", () => {
      cy.scrollTo("topLeft");
      cy.get("iframe[id='lazy-loaded']").should("have.attr", "loading", "lazy");
    });

    it("should render an iframe with loading=lazy", () => {
      cy.scrollTo("topLeft");
      cy.get("iframe[id='lazy-loaded']")
        .should("have.attr", "loading", "lazy")
        .should("not.be.visible");
      cy.get("iframe[id='lazy-loaded']")
        .scrollIntoView({ duration: 300 })
        .should("be.visible");
    });
  });
}

describe("Iframe lazy-load with Intersection Observer", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3001?name=iframe", {
      onBeforeLoad(win) {
        Object.defineProperty(win.HTMLIframeElement.prototype, "loading", {
          configurable: true,
          writable: true
        });
        delete win.HTMLIframeElement.prototype.loading;
      }
    });
  });

  it("native lazy-load should not exist in iframe element", () => {
    return cy
      .window()
      .its("HTMLIframeElement")
      .then(iframeElement => {
        expect("loading" in iframeElement.prototype).toBe(false);
      });
  });

  it("iframe with loading=lazy attribute and value should not exist", () => {
    cy.scrollTo("topLeft");
    cy.get("iframe[id='lazy-loaded']").should(
      "not.have.attr",
      "loading",
      "lazy"
    );
  });

  it("should lazy-load iframe", () => {
    cy.scrollTo("topLeft");
    cy.get("iframe[id='lazy-loaded']").should("not.be.visible");
    cy.get("iframe[id='lazy-loaded']")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
  });
});
