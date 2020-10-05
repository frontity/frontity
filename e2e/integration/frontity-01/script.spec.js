/* eslint-disable jest/valid-expect-in-promise */
import expect from "expect";

describe("Script", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=script");
  });

  it("should load a external script from src url", () => {
    cy.get("[id='from-src']")
      .should(
        "have.attr",
        "src",
        "https://unpkg.com/moment@2.24.0/min/moment.min.js"
      )
      .should("have.attr", "async", "async");
  });

  it("should access code from the external script", () => {
    let isMoment;
    cy.window()
      .then((win) => {
        isMoment = win.moment()._isAMomentObject;
      })
      .then(() => {
        expect(isMoment).toBe(true);
      });
  });

  it("should load inline script", () => {
    cy.get("[data-test-id='target']").should("have.text", "OFF");
    cy.get("[data-test-id='toggle']").click();
    cy.get("[data-test-id='target']").should("have.text", "ON");
  });

  it("should not fail when scripts are unmounted", () => {
    cy.get("[data-test-id='unmount-script']").click();
  });
});
