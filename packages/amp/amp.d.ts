/**
 * The namespace which overrides the built-in JSX namespace. It's necessary in
 * order to use AMP components with typescript. Otherwise, TS will complain
 * because it does not recognize the AMP components.
 *
 * @remarks
 * For more information see:
 * - https://github.com/Microsoft/TypeScript/issues/15449
 * - https://stackoverflow.com/questions/50585952/typescript-and-google-amp-property-amp-img-does-not-exist-on-type-jsx-intrin.
 */
declare namespace JSX {
  /**
   * Override the built in JSX interface.
   */
  interface IntrinsicElements {
    /**
     * The amp-img component.
     */
    "amp-img": any;

    /**
     * The amp-iframe component.
     */
    "amp-iframe": any;

    /**
     * The amp-video component.
     */
    "amp-video": any;

    /**
     * The amp-audio component.
     */
    "amp-audio": any;
  }
}

/**
 * Extends the types of the jest's expect method with `toBeValidAmpHtml()`
 * from the `jest-amp` package.
 */
declare namespace jest {
  /**
   * Jest Matchers.
   */
  interface Matchers<R> {
    toBeValidAmpHtml(): R;
  }
}
