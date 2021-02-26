import type { taskTypes } from "../../plugins";
import amphtmlValidator, { Validator } from "amphtml-validator";

const task: taskTypes = cy.task;

const validateAMP = (validator: Validator, response) => {
  const result = { ...validator.validateString(response.body), msg: "" };

  result.errors.forEach((error) => {
    const msg = `line ${error.line}, col ${error.col}: ${error.message}`;
    if (error.specUrl !== null) {
      result.msg += `${msg} (see ${error.specUrl})`;
    }
    result.msg += "\n\n";
  });

  if (result.msg !== "") throw new Error(result.msg);

  return result;
};

describe("AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp/data.sql",
    });
    cy.visit("http://localhost:3001/hello-world/?frontity_name=amp-wordpress");
  });

  // after(() => {
  //   task("resetDatabase");
  //   task("removeAllPlugins");
  // });

  it("test amp-img", () => {
    cy.request(
      "GET",
      "http://localhost:3001/hello-world/?frontity_name=amp-wordpress"
    ).then((response) => {
      cy.wrap(amphtmlValidator.getInstance()).then((validator: Validator) => {
        const result = validateAMP(validator, response);
        cy.wrap(result.status).should("equal", "PASS");
        cy.get("amp-img > img").should("exist");
      });
    });
  });
});
