import expect from "expect";
import type { taskTypes } from "../../plugins";

const task: taskTypes = cy.task;

describe("AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp-mars-theme/data.sql",
    });
  });

  it("amp-iframe", () => {
    const url = "http://localhost:3001/?frontity_name=amp-mars-theme";

    cy.validateAMP(url);
    cy.visit(url);
  });
});
