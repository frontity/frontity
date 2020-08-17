import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's emotion integration.
 */
interface Emotion extends Package {
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Emotion namespace.
     */
    emotion: React.ReactType;
  };
}

export default Emotion;
