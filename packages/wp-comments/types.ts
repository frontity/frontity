import { Package, Action, AsyncAction } from "frontity/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Object that represents a form to submit comments in a post.
 */
interface Form {
  /**
   * Form fields with their values.
   */
  fields: Fields;

  /**
   * Field values when this form is submitted along with the submission status.
   *
   * @remarks
   * This prop is undefined if nothing has been submitted yet.
   */
  submitted?: Submitted;
}

/**
 * Form fields with their values.
 */
interface Fields {
  /**
   * Author's name.
   */
  author: string;

  /**
   * Author's email.
   */
  email: string;

  /**
   * Text of the comment.
   */
  comment: string;

  /**
   * URL of the author's site.
   *
   * @defaultValue ""
   */
  url?: string;

  /**
   * ID of the comment to which this one responds.
   *
   * @defaultValue 0
   */
  parent?: number;
}

/**
 * Form field values when it is submitted along with the submission status.
 */
interface Submitted extends Fields {
  /**
   * The comment hasn't been received by WP yet.
   */
  isPending: boolean;

  /**
   * The comment has been received but not accepted yet.
   */
  isOnHold: boolean;

  /**
   * The comment has been received and is published.
   */
  isApproved: boolean;

  /**
   * The request has failed.
   */
  isError: boolean;

  /**
   * Failure reason.
   */
  errorMessage: string;

  /**
   * Submission timestamp.
   */
  timestamp: number;

  /**
   * Comment ID if it has been received (`isOnHold` or `isApproved`).
   */
  id?: number;
}

/**
 * Add integration for WordPress native comments.
 */
interface WpComments extends Package {
  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Comments namespace.
     */
    comments: {
      /**
       * Map of form objects by post ID.
       */
      forms: Record<number, Form>;
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: {
    /**
     * Comments namespace.
     */
    comments: {
      /**
       * Publish a new comment to the post specified by `postId`.
       *
       * It submits the fields stored in the respective form (i.e.
       * `state.comments.form[postId]`) or the fields passed as a second
       * argument. If fields are passed, those replace the current values stored
       * in `state.comments.form[postId].fields`.
       *
       * After calling this action, you can access
       * `state.comments.forms[postId].submitted` properties to know the
       * submission status.
       *
       * @remarks
       * This action does not validate input. That means requests are made even
       * though some fields are empty or have invalid values. If that is the
       * case, WordPress would return an error message and populate the error
       * status accordingly.
       *
       *
       * @example
       * ```
       * actions.comments.submit(60);
       * ```
       *
       * @example
       * ```
       * actions.comments.submit(60, {
       *   comment: "This is a comment example. Hi!",
       *   author: "Frontibotito",
       *   email: "frontibotito@frontity.com",
       * });
       * ```
       *
       * @param postId - The ID of the post where the comment will be published.
       *
       * @param comment - Object of type {@link Fields}.
       *
       * @returns A promise that resolves when the comment was submitted.
       */
      submit:
        | AsyncAction<Packages, number>
        | AsyncAction<Packages, number, Fields>;

      /**
       * Update the fields of the form specified by `postId`.
       *
       * This action simply updates what is stored in
       * `state.comments.form[postId].fields` with the given values.
       *
       * If no fields are specified, the form fields are emptied.
       *
       * @example
       * ```
       * actions.comments.updateFields(60, {
       *   comment: "Hello world!"
       * });
       * ```
       *
       * @param postId - The ID of the post where the comment will be published.
       *
       * @param comment - Partial object of type {@link Fields}.
       */
      updateFields:
        | AsyncAction<Packages, number>
        | Action<Packages, number, Partial<Fields>>;
    };
  };
}

/**
 * Packages used internally by WpComments.
 */
export type Packages = WpComments & WpSource;

export default WpComments;
