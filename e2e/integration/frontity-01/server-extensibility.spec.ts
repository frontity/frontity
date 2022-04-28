// import { ResolvePackages } from "../../../packages/types/src/utils";
// import { Packages } from "../../packages/render/types";

// type WindowWithFrontity = Cypress.AUTWindow & {
//   frontity: ResolvePackages<Packages>;
// };

describe("Server Extensibility", () => {
  it("should render the root component", () => {
    cy.visit("http://localhost:3001/?frontity_name=server-extensibility");

    cy.get('[data-test-id="frontity-root"]').should(
      "contain",
      "Server Extensibility"
    );
  });

  it("should get the robots.txt file from the custom middleware", () => {
    cy.request("/robots.txt?frontity_name=server-extensibility")
      .its("body")
      .should(
        "equal",
        "User-agent: *\nAllow: /\nSitemap: http://www.example.com/sitemap.xml"
      );
  });
});
