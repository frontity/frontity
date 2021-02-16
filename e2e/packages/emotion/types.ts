import { Package } from "frontity/types";

/**
 * Package to do e2e testing of Frontity's emotion integration.
 */
interface Emotion extends Package {
  /**
   * Package name.
   */
  name: "e2e-emotion";
  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * Emotion namespace.
     */
    emotion: React.ElementType;
  };
}

export default Emotion;
