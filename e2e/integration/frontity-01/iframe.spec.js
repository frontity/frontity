import expect from "expect";

// eslint-disable-next-line jest/valid-describe
describe("Native iframe lazy-load", { browser: "!firefox" }, () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3001?frontity_name=iframe");
  });

  it("should render an iframe with a loading attribute and 'lazy' as value", () => {
    cy.scrollTo("topLeft");
    cy.get("iframe").should("have.attr", "loading", "lazy");
  });
});

describe("Iframe lazy-load with Intersection Observer", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3001?frontity_name=iframe", {
      onBeforeLoad(win) {
        Object.defineProperty(win.HTMLIFrameElement.prototype, "loading", {
          configurable: true,
          writable: true,
        });
        delete win.HTMLIFrameElement.prototype.loading;
      },
    });
  });

  it("native lazy-load should not exist in iframe element", () => {
    return cy
      .window()
      .its("HTMLIFrameElement")
      .then((HTMLIframeElement) => {
        expect("loading" in HTMLIframeElement.prototype).toBe(false);
      });
  });

  it("should not be visible until it is lazy-loaded", () => {
    cy.scrollTo("topLeft");
    cy.get("iframe")
      .should("have.attr", "loading", "lazy")
      .should("not.be.visible");
  });

  it("should lazy-load iframe", () => {
    cy.scrollTo("topLeft");
    cy.get("iframe")
      .should("have.attr", "loading", "lazy")
      .should("not.be.visible");
    cy.get("iframe").scrollIntoView({ duration: 300 }).should("be.visible");
  });
});
