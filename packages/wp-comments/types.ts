import { Package, Action } from "frontity/types";
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

interface WpComments extends Package {
  actions: {
    comments: {
      create: Action<Packages, Comment>;
    };
  };
}

export type Packages = WpComments & WpSource;

export default WpComments;
