describe("wp-comments", () => {
  before(() => {
    cy.task("installPlugin", {
      name: "code-snippets",
    });
  });

  /**
   *
   * A helper to test that the comments object has properties with certain values.
   *
   * @param postId - The ID of the post for which a comment should be posted.
   *
   * @returns An object with a `shouldHavePropertyWithValue()` method for easily
   * chaining it.
   */
  const comment = (postId) => ({
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

  describe("general tests", () => {
    beforeEach(() => {
      cy.task("loadDatabase", {
        path: "./wp-data/wp-comments/code-snippets.sql",
      });
      cy.visit("http://localhost:3001?name=wp-comments");
    });

    it("should return an error when sending a comment for a non-existing post ID", () => {
      cy.get("#comment-wrong-id").click();

      comment(9999).shouldHavePropertyWithValue("isError", true);
      comment(9999).shouldHavePropertyWithValue(
        "errorMessage",
        "Sorry, you are not allowed to create this comment without a post."
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

      comment(1).shouldHavePropertyWithValue("isSubmitted", false);
      comment(1).shouldHavePropertyWithValue("isSubmitting", false);

      cy.get("@consoleWarn").should(
        "be.calledWith",
        "You cannot submit a comment to the same post if another is already pending.\nVisit https://community.frontity.org for help! 🙂\n"
      );
    });
  });

  describe("Without the snippet added", () => {
    it("Should not allow the user to comment and return an error", () => {
      // Load the database version without the following snippet:
      /// add_filter( 'rest_allow_anonymous_comments', '__return_true' );
      cy.task("loadDatabase", {
        path: "./wp-data/wp-comments/no-code-snippets.sql",
      });
      cy.visit("http://localhost:3001?name=wp-comments");

      cy.get("#comment-ok").click();

      comment(1).shouldHavePropertyWithValue("isError", true);
      comment(1).shouldHavePropertyWithValue(
        "errorCode",
        "rest_comment_login_required"
      );
      comment(1).shouldHavePropertyWithValue(
        "errorMessage",
        "Sorry, you must be logged in to comment."
      );
    });
  });

  describe(`With code snippets loaded`, () => {
    beforeEach(() => {
      // Load the database version WITH the snippet:
      /// add_filter( 'rest_allow_anonymous_comments', '__return_true' );
      cy.task("loadDatabase", {
        path: "./wp-data/wp-comments/code-snippets.sql",
      });
      cy.visit("http://localhost:3001?name=wp-comments");
    });

    it("should return an error when sending a comment without an email", () => {
      cy.get("#comment-no-email").click();

      comment(1).shouldHavePropertyWithValue("isError", true);
      comment(1).shouldHavePropertyWithValue(
        "errorMessage",
        "Creating a comment requires valid author name and email values."
      );
    });

    it("Should allow submitting a comment if email & name are not required", () => {
      cy.task("updateOption", { name: "require_name_email", value: 0 });

      cy.get("#comment-no-email").click();

      comment(1).shouldHavePropertyWithValue("isSubmitted", true);
    });
  });

  describe(`With "Comment author must fill out name and email" disabled`, () => {});
  describe(`With "Allow people to submit comments on new posts" disabled `, () => {});
  describe(`With "Comment must be manually approved" enabled`, () => {});
  describe(`With "Users must be registered and logged in to comment" enabled`, () => {});
});
