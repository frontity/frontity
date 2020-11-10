import { Package, Action, AsyncAction } from "frontity/types";
import { Data } from "@frontity/source/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Schema for a Comment entity in WordPress.
 * This is the interface for the data fetched and received directly from the WordPress REST API.
 */
export interface WpComment {
  /**
   * Unique identifier for the object.
   */
  id: number;

  /**
   * The ID of the associated post object.
   */
  post: number;

  /**
   * The ID for the parent of the object.
   */
  parent: number;

  /**
   * The ID of the user object, if author was a user.
   */
  author: number;

  /**
   * Display name for the object author.
   */
  author_name: string;

  /**
   * URL for the object author.
   */
  author_url: string;

  /**
   * The date the object was published, in the site's timezone.
   */
  date: string;

  /**
   * The date the object was published, as GMT.
   */
  date_gmt: string;

  /**
   * The content for the object.
   */
  content: {
    /**
     * Content rendered in HTML format.
     */
    rendered: string;
  };

  /**
   * URL to the object.
   */
  link: string;

  /**
   * State of the object.
   */
  status: "approved" | "hold" | "spam" | "trash";

  /**
   * Type of Comment for the object.
   */
  type: string;

  /**
   * Avatar URLs for the object author.
   */
  author_avatar_urls: Record<string, string>;

  /**
   * Meta fields.
   */
  meta: [];
}

/**
 * The error that might be received from WordPress REST API when POSTing a comment.
 */
export interface WpCommentError {
  /**
   * An identifier for the error in the WordPress REST API.
   *
   * @example rest_comment_invalid_post_id
   */
  code: string;

  /**
   * Just a namespace.
   */
  data: {
    /**
     * The status code of the HTTP response.
     */
    status: number;
  };

  /**
   * The human-readable error message.
   *
   * @example "Sorry, you are not allowed to create this comment without a post."
   */
  message: string;
}

/**
 * Comment item, added by {@link commentsHandler} to data objects in
 * `state.source.data[commentLink].items`.
 */
export interface CommentItem {
  /**
   * Comment type.
   */
  type: string;

  /**
   * Comment ID.
   */
  id: number;

  /**
   * List of replies (if any).
   */
  children?: CommentItem[];
}

/**
 * Data for the comments published in a post.
 */
export interface CommentData extends Data {
  /**
   * Post ID where the comments are published.
   */
  postId: number;
  /**
   * Type of this data object.
   */
  type: "comments";
  /**
   * Identify a data of type comments.
   */
  isComments: true;
  /**
   * Tree of all comments published.
   */
  items: CommentItem[];
  /**
   * Number of comments.
   */
  total: number;
  /**
   * Number of comment pages.
   */
  totalPages: number;
}

/**
 * Object that represents a form to submit comments in a post.
 */
export interface Form {
  /**
   * Form fields with their values.
   */
  fields: Fields;

  /**
   * The comment hasn't been received by WP yet.
   */
  isSubmitting: boolean;

  /**
   * The comment has been received.
   */
  isSubmitted: boolean;

  /**
   * The request has failed.
   */
  isError: boolean;

  /**
   * Failure reason.
   */
  errorMessage: string;

  /**
   * The error code. Those are defined internally in the WordPress REST API.
   *
   * @example rest_comment_invalid_post_id
   */
  errorCode: string;

  /**
   * The HTTP status code that might have been received from the WordPress REST API.
   */
  errorStatusCode?: number;

  /**
   * The validation errors that can be returned by the WordPress REST API.
   */
  errors: {
    [K in keyof Fields]?: string;
  };
}

/**
 * Form fields with their values.
 */
export interface Fields {
  /**
   * Author's name.
   */
  authorName?: string;

  /**
   * The ID of the author.
   */
  author?: number;

  /**
   * Author's email.
   */
  authorEmail?: string;

  /**
   * URL of the author's site.
   *
   * @defaultValue ""
   */
  authorURL?: string;

  /**
   * Content of the comment.
   */
  content: string;

  /**
   * ID of the comment to which this one responds.
   *
   * @defaultValue 0
   */
  parent?: number;
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

    /**
     * Source namespace.
     */
    source: {
      /**
       * Map of comments by ID.
       *
       * Here is where comments are stored when fetched using
       * `actions.source.fetch()`.
       */
      comment: Record<number, WpComment>;
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

  /**
   * Libraries exposed by this package.
   */
  libraries: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * Handlers are objects that associate a link pattern with a function that
       * fetches all the entities that belong to that WordPress link.
       *
       * Extended with {@link commentsHandler}.
       */
      handlers: WpSource["libraries"]["source"]["handlers"];
    };
  };
}

/**
 * Packages used internally by WpComments.
 */
export type Packages = WpComments & WpSource;

export default WpComments;
