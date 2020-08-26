describe("wp-comments", () => {
  before(() => {
    cy.task("installPlugin", { name: "code-snippets" });
  });

  beforeEach(() => {
    cy.task("loadDatabase", {
      path: "./wp-data/wp-comments/code-snippets.sql",
    });
    cy.visit("http://localhost:3001?name=wp-comments");
  });

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  const commentForPostId = (postId) => ({
    shouldHavePropertyWithValue: (property, value) =>
      cy
        .window()
        .its("frontity")
        .its("state")
        .its("comments")
        .its("forms")
        .its(postId)
        .should("have.nested.property", property, value),
  });

  it("should work in the basic case", () => {
    cy.get("#comment-ok").click();

    commentForPostId(1).shouldHavePropertyWithValue("submitted.isOnHold", true);
    commentForPostId(1).shouldHavePropertyWithValue(
      "submitted.isApproved",
      false
    );
    commentForPostId(1).shouldHavePropertyWithValue("submitted.id", 2);
  });

  it("should return an error when sending a comment for a non-existing post ID", () => {
    cy.get("#comment-wrong-id").click();

    commentForPostId(9999).shouldHavePropertyWithValue(
      "submitted.isError",
      true
    );
    commentForPostId(9999).shouldHavePropertyWithValue(
      "submitted.errorMessage",
      "Sorry, you are not allowed to create this comment without a post."
    );
  });

  it("should return when sending a comment without an email", () => {
    cy.get("#comment-no-email").click();

    commentForPostId(1).shouldHavePropertyWithValue("submitted.isError", true);
    commentForPostId(1).shouldHavePropertyWithValue(
      "submitted.errorMessage",
      "Creating a comment requires valid author name and email values."
    );
  });

  it("should warn when attempting to send the same comment when another is pending", () => {
    cy.visit("http://localhost:3001?name=wp-comments", {
      onBeforeLoad(win) {
        cy.stub(win.console, "warn").as("consoleWarn");
      },
    });

    cy.get("#comment-ok").click();
    cy.get("#comment-ok").click();

    commentForPostId(1).shouldHavePropertyWithValue("submitted.isOnHold", true);
    commentForPostId(1).shouldHavePropertyWithValue(
      "submitted.isApproved",
      false
    );
    commentForPostId(1).shouldHavePropertyWithValue("submitted.id", 2);

    cy.get("@consoleWarn").should(
      "be.calledWith",
      "You cannot submit a comment to the same post if another is already pending.\nVisit https://community.frontity.org for help! 🙂\n"
    );
  });
});
