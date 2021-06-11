import expect from "expect";
import amphtmlValidator, { Validator } from "amphtml-validator";

import type { taskTypes } from "../../plugins";

const task: taskTypes = cy.task;

describe("mars-theme with AMP", () => {
  let validator: Validator;
  before(async () => {
    validator = await amphtmlValidator.getInstance();
  });

  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp-mars-theme/data.sql",
    });
  });

  it("front page", () => {
    const url = "http://localhost:3001/?frontity_name=amp-mars-theme";

    // The validator should only throw ONE error for missing rel=canonical link.
    // This is because it's the reponsibility of the user to create the
    // <link rel="canonical" /> tag.
    cy.request("GET", url).then((response) => {
      const result = validator.validateString(response.body);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toBe(
        "The mandatory tag 'link rel=canonical' is missing or incorrect."
      );
    });

    cy.visit(url);
    cy.get("section > article").should("have.length", 2);
  });

  it("individual post page", () => {
    const url =
      "http://localhost:3001/the-white-heron/?frontity_name=amp-mars-theme";

    // The validator should only throw ONE error for missing rel=canonical link.
    // This is because it's the reponsibility of the user to create the
    // <link rel="canonical" /> tag.
    cy.request("GET", url).then((response) => {
      const result = validator.validateString(response.body);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toBe(
        "The mandatory tag 'link rel=canonical' is missing or incorrect."
      );
    });

    cy.visit(url);

    cy.get("figure.wp-block-image > amp-img").should("have.descendants", "img");
  });
});
