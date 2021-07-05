/**
 * Include `amp-ad` to the `JSX.IntrinsicElements` interface.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /** JSX Intrinsic Elements. */
    interface IntrinsicElements {
      /** The `amp-ad` element. */
      "amp-ad": any;
    }
  }
}

/**
 * Properties of the {@link AmpAd} component.
 *
 * @remarks
 * See
 * {@link https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-doubleclick-impl/amp-ad-network-doubleclick-impl-internal.md#configuration|Google Ad Manager's configuration section}
 * for more information.
 */
export interface AmpAdProps {
  /**
   * Full path of the ad unit with the network code and unit code.
   *
   * @example "/4119129/mobile_ad_banner"
   */
  slot: string;

  /**
   * Width attribute of the primary size, in pixels.
   */
  width: number;

  /**
   * Height attribute of the primary size, in pixels.
   */
  height: number;

  /**
   * Layout attribute for AMP elements. See
   * {@link https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout/?format=websites#the-layout-attribute|the `layout` attribute}
   * docs for more info.
   *
   * @remarks
   * As stated
   * {@link https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-doubleclick-impl/multi-size.md|here},
   * multi-size slots may have unexpected interactions with layout="responsive".
   * For this reason it is strongly encouraged that multi-size slots use
   * layout="fixed".
   */
  layout?: string;

  /**
   * Width attribute for explicitly requesing different ad dimensions from the
   * primary size, in pixels.
   */
  overrideWidth?: number;

  /**
   * Height attribute for explicitly requesing different ad dimensions from the
   * primary size, in pixels.
   */
  overrideHeight?: number;

  /**
   * A string of comma separated sizes, which if present, forces the tag to
   * request an ad with all of the given sizes, including the primary size.
   *
   * @remarks
   * See the
   * {@link https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-doubleclick-impl/multi-size.md|multi-size documentation page}
   * for details.
   *
   * @example "700x90,700x60,500x60"
   */
  multiSize?: string;

  /**
   * If set to false, this will allow secondary sizes (those specified in the
   * {@link AmpAdProps.multiSize} prop) to be less than 2/3rds of the
   * corresponding primary size. By default this is assumed to be true.
   *
   * @defaultValue true
   */
  multiSizeValidation?: boolean;

  /**
   * Extra configuration via JSON (see {@link JsonProp}).
   */
  json?: JsonProp;
}

/**
 * Property `json` included in {@link AmpAdProps}.
 */
export interface JsonProp {
  /**
   * Sets a slot-level category exclusion for the given label name.
   */
  categoryExclusions?: string[];

  /**
   * Sets options for ignoring DFP cookies on the current page.
   * - 0: Enables DFP cookies on ad requests on the page.
   * - 1: Ignores DFP cookies on subsequent ad requests and prevents cookies
   *   from being created on the page.
   *
   * @defaultValue 0
   */
  cookieOptions?: number;

  /**
   * Configures whether the slot should be treated as child-directed.
   *
   * @remarks
   * See the TFCD article for
   * {@link https://support.google.com/dfp_sb/answer/3721907|Small Business} or
   * {@link https://support.google.com/dfp_premium/answer/3671211|Premium} for
   * more details and allowed values.
   */
  tagForChildDirectedTreatment?: boolean;

  /**
   * Custom targeting parameter for this slot.
   */
  targeting?: Record<string, string | string[]>;
}
