// This allows us to get TypeScript Intellisense and autocompletion.
import type { taskTypes } from "../../plugins";
const task: taskTypes = cy.task;

describe("wp-comments", () => {
  before(() => {
    cy.task("installPlugin", {
      name: "code-snippets",
    });
  });

  /**
   *
   * A helper to test that `state.comments` object has properties with certain values.
   *
   * @param postId - The ID of the post for which a comment should be posted.
   *
   * @returns An object with a `shouldHavePropertyWithValue()` method for easily
   * chaining it.
   */
  const comment = (postId: number) => ({
    shouldHavePropertyWithValue: (property: string, value: any) =>
      cy
        .window()
        .its("frontity")
        .its("state")
        .its("comments")
        .its("forms")
        .its(postId)
        .should("have.nested.property", property, value),
  });

  /**
   * A helper to test that `state.cource` object has properties with certain values.
   *
   * @param postKey - The key of the state object for the comments.
   * @example `@comments/60`
   * @returns An object with a `shouldHavePropertyWithValue()` method for easily
   * chaining it.
   */
  const state = (postKey: string) => ({
    shouldHavePropertyWithValue: (property: string, value: any) =>
      cy
        .window()
        .its("frontity")
        .its("state")
        .its("source")
        .its("data")
        .its(postKey)
        .should("have.nested.property", property, value),
  });

  describe("General tests that don't depend on particular WordPress settings", () => {
    beforeEach(() => {
      task("loadDatabase", {
        path: "./wp-data/wp-comments/code-snippets.sql",
      });
      cy.visit("http://localhost:3001?name=wp-comments");
    });

    it("Should return an error when sending a comment for a non-existing post ID", () => {
      cy.get("#comment-wrong-id").click();

      comment(9999).shouldHavePropertyWithValue("isError", true);
      comment(9999).shouldHavePropertyWithValue(
        "errorMessage",
        "Sorry, you are not allowed to create this comment without a post."
      );
    });

    it("Should return an error when submitting a duplicate comment", () => {
      cy.visit("http://localhost:3001?name=wp-comments", {
        onBeforeLoad(win) {
          cy.stub(win.console, "warn").as("consoleWarn");
        },
      });

      cy.get("#comment-ok").click();
      comment(1).shouldHavePropertyWithValue("isSubmitted", true);
      comment(1).shouldHavePropertyWithValue("isSubmitting", false);

      cy.get("#comment-ok").click();
      comment(1).shouldHavePropertyWithValue("isSubmitted", false);
      comment(1).shouldHavePropertyWithValue("isSubmitting", false);

      comment(1).shouldHavePropertyWithValue("isError", true);
      comment(1).shouldHavePropertyWithValue("errorCode", "comment_duplicate");
      comment(1).shouldHavePropertyWithValue(
        "errorMessage",
        "Duplicate comment detected; it looks as though you&#8217;ve already said that!"
      );
    });
  });

  describe("Without the snippet added", () => {
    it("Should not allow the user to comment and return an error", () => {
      // Load the database version without the following snippet:
      /// add_filter( 'rest_allow_anonymous_comments', '__return_true' );
      task("loadDatabase", {
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
      task("loadDatabase", {
        path: "./wp-data/wp-comments/code-snippets.sql",
      });
      cy.visit("http://localhost:3001?name=wp-comments");
    });

    it("Should return an error when sending a comment without an email", () => {
      cy.get("#comment-no-email").click();

      comment(1).shouldHavePropertyWithValue("isError", true);
      comment(1).shouldHavePropertyWithValue(
        "errorMessage",
        "Creating a comment requires valid author name and email values."
      );
    });

    it("Should allow submitting a comment if email & name are not required", () => {
      // Disable the option to require the name and email to comment
      task("updateOption", {
        name: "require_name_email",
        value: 0,
      });

      cy.get("#comment-no-email").click();

      comment(1).shouldHavePropertyWithValue("isSubmitting", false);
      comment(1).shouldHavePropertyWithValue("isSubmitted", true);

      state(`@comments/1/`).shouldHavePropertyWithValue("id", 2);
      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      state(`@comments/1/`).shouldHavePropertyWithValue("isFetching", false);
      state(`@comments/1/`).shouldHavePropertyWithValue("items[0].id", 2);
    });

    it(`Should be registered in order to post a comment if "Users must be registered and logged in to comment" is enabled`, () => {
      // Require the user to be registered and logged in to comment
      task("updateOption", {
        name: "comment_registration",
        value: 1,
      });

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

  // describe(`With "Comment author must fill out name and email" disabled`, () => {});
  // describe(`With "Allow people to submit comments on new posts" disabled `, () => {});
  describe(`With "Comment must be manually approved" enabled`, () => {});
});
