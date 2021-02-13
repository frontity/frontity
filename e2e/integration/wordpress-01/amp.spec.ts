import type { taskTypes } from "../../plugins";
// import amphtmlValidator from "amphtml-validator";

const task: taskTypes = cy.task;

describe("AMP", () => {
  before(() => {
    task("loadDatabase", {
      path: "./wp-data/amp/data.sql",
    });
  });

  after(() => {
    task("resetDatabase");
    task("removeAllPlugins");
  });

  it("test", () => {
    cy.request("GET", "http://localhost:3001/hello-world/?frontity_name=amp");

    // We can use the amphtmlvalidator here to validate the HTML of the full page
  });
});
