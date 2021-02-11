import type { taskTypes } from "../../plugins";
import amphtmlValidator from "amphtml-validator";

const task: taskTypes = cy.task;

describe("AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp/data.sql",
    });
  });

  // after(() => {
  //   task("resetDatabase");
  //   task("removeAllPlugins");
  // });

  it("test", () => {
    cy.visit("http://localhost:3001/?frontity_name=amp");

    cy.get("#test").should("exist");

    cy.request("GET", "http://localhost:3001/?frontity_name=amp").then(
      (response) => {
        amphtmlValidator.getInstance().then((validator) => {
          const result = validator.validateString(response.body);

          expect(result.status).to.equal("PASS");
        });
      }
    );
  });
});
