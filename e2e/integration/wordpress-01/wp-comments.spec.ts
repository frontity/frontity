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
  const commentForm = (postId: number) => ({
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

      commentForm(9999).shouldHavePropertyWithValue("isError", true);
      commentForm(9999).shouldHavePropertyWithValue(
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
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);
      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);

      cy.get("#comment-ok").click();
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);

      commentForm(1).shouldHavePropertyWithValue("isError", true);
      commentForm(1).shouldHavePropertyWithValue(
        "errorCode",
        "comment_duplicate"
      );
      commentForm(1).shouldHavePropertyWithValue(
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

      commentForm(1).shouldHavePropertyWithValue("isError", true);
      commentForm(1).shouldHavePropertyWithValue(
        "errorCode",
        "rest_comment_login_required"
      );
      commentForm(1).shouldHavePropertyWithValue(
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

      commentForm(1).shouldHavePropertyWithValue("isError", true);
      commentForm(1).shouldHavePropertyWithValue(
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

      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);

      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      state(`@comments/1/`).shouldHavePropertyWithValue("isFetching", false);
      state(`@comments/1/`).shouldHavePropertyWithValue("items[0].id", 2);

      // There should be a total of 1 comments now, even though there had existed one
      // comment previously. This is because we haven't fetched the data
      state(`@comments/1/`).shouldHavePropertyWithValue("total", 1);
    });

    it(`Should be registered in order to post a comment if "Users must be registered and logged in to comment" is enabled`, () => {
      // Require the user to be registered and logged in to comment
      task("updateOption", {
        name: "comment_registration",
        value: 1,
      });

      cy.get("#comment-ok").click();

      commentForm(1).shouldHavePropertyWithValue("isError", true);
      commentForm(1).shouldHavePropertyWithValue(
        "errorCode",
        "rest_comment_login_required"
      );
      commentForm(1).shouldHavePropertyWithValue(
        "errorMessage",
        "Sorry, you must be logged in to comment."
      );
    });

    it(`Should post a sub-comment correctly`, () => {
      // fetch all comments and wait till they are in state
      cy.get("#fetch-comments").click();
      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);

      cy.get("#sub-comment").click();

      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);

      // There should exist a sub-comment of the top-level comment
      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      state(`@comments/1/`).shouldHavePropertyWithValue(
        "items[0].children[0].id",
        2
      );

      // There should be a total of 2 comments now
      state(`@comments/1/`).shouldHavePropertyWithValue("total", 2);
    });

    it(`Should submit a form with an error and then submit correctly`, () => {
      // fetch all comments and wait till they are in state
      cy.get("#fetch-comments").click();
      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);

      cy.get("#sub-comment").click();

      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);

      // There should exist a sub-comment of the top-level comment
      state(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      state(`@comments/1/`).shouldHavePropertyWithValue(
        "items[0].children[0].id",
        2
      );

      // There should be a total of 2 comments now
      state(`@comments/1/`).shouldHavePropertyWithValue("total", 2);
    });
  });
});
