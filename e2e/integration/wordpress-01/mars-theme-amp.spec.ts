import type { taskTypes } from "../../plugins";

const task: taskTypes = cy.task;

describe("mars-theme with AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp-mars-theme/data.sql",
    });
  });

  it("front page", () => {
    const url = "http://localhost:3001/?frontity_name=amp-mars-theme";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("section > article").should("have.length", 10);
  });

  it("individual post page", () => {
    const url =
      "http://localhost:3001/block-image/?frontity_name=amp-mars-theme";

    cy.validateAMP(url);
    cy.visit(url);

    cy.get("figure.wp-block-image > amp-img").should("have.descendants", "img");
  });
});
