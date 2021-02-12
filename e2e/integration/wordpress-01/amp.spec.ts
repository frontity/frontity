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
    const link = "http://localhost:3001/hello-world/?frontity_name=amp";

    cy.visit(link);
    cy.request("GET", link).then((response) => {
      amphtmlValidator.getInstance().then((validator) => {
        const result = validator.validateString("<img-amp></img-amp>");

        if (result.status !== "PASS") {
          for (let i = 0; i < result.errors.length; i++) {
            const error = result.errors[i];
            let msg =
              "line " +
              error.line +
              ", col " +
              error.col +
              ": " +
              error.message;
            if (error.specUrl !== null) {
              msg += " (see " + error.specUrl + ")";
            }
            cy.log(msg);
          }
        }

        expect(result.status).to.equal("PASS");
      });
    });
  });
});
