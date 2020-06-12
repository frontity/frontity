import { Package, AsyncAction } from "frontity/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Comment object.
 */
export type Comment = {
  /**
   * The comment text.
   */
  comment: string;
  /**
   * Author name that will be shown with the comment.
   */
  author: string;
  /**
   * The email address of the author.
   */
  email: string;
  /**
   * URL of the author’s website.
   */
  url?: string;
  /**
   * ID of the post where this comment will be posted.
   */
  postId: number;
  /**
   * ID of the comment parent (if this comment is a reply).
   */
  parentId?: number;
};

/**
 * `@frontity/wp-comments` package.
 */
interface WpComments extends Package {
  actions: {
    /**
     * Actions to handle comments.
     */
    comments: {
      /**
       * Publish a new comment to the post specified by `postId`.
       *
       * Usage example:
       *
       * ```ts
       * actions.comments.create({
       *   comment: "This is a comment example. Hi!",
       *   author: "Frontibotito",
       *   email: "frontibotito@frontity.com",
       *   postId: 60,
       * });
       * ```
       *
       * @param comment - Object of type {@link Comment}.
       */
      create: AsyncAction<Packages, Comment>;
    };
  };
}

export type Packages = WpComments & WpSource;

export default WpComments;
