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
   * A helper to test that `state.comments.forms` object has properties with certain values.
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
   * A helper to test that `state.source.comment` object has properties with certain values.
   *
   * @param id - The ID of the comment.
   *
   * @returns An object with a `shouldHavePropertyWithValue()` method for easily
   * chaining it.
   */
  const comment = (id: number) => ({
    shouldHavePropertyWithValue: (property: string, value: any) =>
      cy
        .window()
        .its("frontity")
        .its("state")
        .its("source")
        .its("comment")
        .its(id)
        .should("have.nested.property", property, value),
  });

  /**
   * A helper to test that `state.source.data` object has properties with certain values.
   *
   * @param postKey - The key of the state object for the comments.
   * @example `@comments/60`
   * @returns An object with a `shouldHavePropertyWithValue()` method for easily
   * chaining it.
   */
  const data = (postKey: string) => ({
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

    it.only("Should allow submitting a comment if email & name are not required", () => {
      // Disable the option to require the name and email to comment
      task("updateOption", {
        name: "require_name_email",
        value: 0,
      });

      cy.get("#comment-no-email").click();

      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);

      // Check that the new comment has been added to `state.source.comment`
      comment(2).shouldHavePropertyWithValue("type", "comment");
      comment(2).shouldHavePropertyWithValue("id", 2);

      const { WORDPRESS_VERSION } = Cypress.env();
      // We compare the strings lexicographically ("5.4.9" < "5.5" < "latest" === true)
      if (WORDPRESS_VERSION.toString() < "5.5") {
        // If the version of WordPress is < 5.5, the comments are approved by default!
        comment(2).shouldHavePropertyWithValue("status", "approved");
      } else {
        comment(2).shouldHavePropertyWithValue("status", "hold");
      }
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
      // fetch the existing (one) comment and wait till it's ready in state
      cy.get("#fetch-comments").click();
      data(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);

      cy.get("#sub-comment").click();

      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);

      // There should exist a sub-comment of the top-level comment
      data(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      data(`@comments/1/`).shouldHavePropertyWithValue(
        "items[0].children[0].id",
        2
      );

      // There should be a total of 2 comments now
      data(`@comments/1/`).shouldHavePropertyWithValue("total", 2);
    });

    it(`Should submit a form with an error and then submit correctly`, () => {
      // fetch the existing (one) comment and wait tills it's ready in state
      cy.get("#fetch-comments").click();
      data(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);

      // Send an incorrect comment and wait till the error has been returned
      cy.get("#comment-no-email").click();
      commentForm(1).shouldHavePropertyWithValue("isError", true);

      // send a correct comment
      cy.get("#comment-ok").click();

      // The submission was successful and the form has been cleared
      commentForm(1).shouldHavePropertyWithValue("isError", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitting", false);
      commentForm(1).shouldHavePropertyWithValue("isSubmitted", true);
      commentForm(1).shouldHavePropertyWithValue("fields.content", "");

      // Check that the new comment has been added to `state.source.comment`
      comment(2).shouldHavePropertyWithValue("type", "comment");
      comment(2).shouldHavePropertyWithValue("id", 2);

      const { WORDPRESS_VERSION } = Cypress.env();
      // We compare the strings lexicographically ("5.4.9" < "5.5" < "latest" === true)
      if (WORDPRESS_VERSION.toString() < "5.5") {
        // If the version of WordPress is < 5.5, the comments are approved by default!
        comment(2).shouldHavePropertyWithValue("status", "approved");
      } else {
        comment(2).shouldHavePropertyWithValue("status", "hold");
      }

      // The new comment has been added to `state.source.data` correctly
      data(`@comments/1/`).shouldHavePropertyWithValue("isReady", true);
      data(`@comments/1/`).shouldHavePropertyWithValue("items.length", 2);
      data(`@comments/1/`).shouldHavePropertyWithValue("items[1].id", 2);

      // There should be a total of 2 comments now
      data(`@comments/1/`).shouldHavePropertyWithValue("total", 2);
    });
  });
});
