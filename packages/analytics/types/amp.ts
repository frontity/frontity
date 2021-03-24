/**
 * Include `amp-analytics` to the `JSX.IntrinsicElements` interface.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /** JSX Intrinsic Elements. */
    interface IntrinsicElements {
      /** The `amp-analytics` element. */
      "amp-analytics": any;
    }
  }
}

/**
 * JSON configuration object that contains the details for what to measure and
 * where to send analytics data.
 *
 * Visit https://amp.dev/documentation/components/amp-analytics/#configuration-data-objects
 * for more information on how to define this kind of objects.
 */
export interface AmpConfig {
  /**
   * Absolute URL that defines the origin for requests.
   */
  requestOrigin?: string;

  /**
   * Specify the URLs used to transmit data to an analytics platform as well as
   * batching or reporting behavior of the request.
   */
  requests?: Record<string, string | AmpRequest>;

  /**
   * Define new key-value pairs or override existing variables that can be
   * referenced in `request` values.
   */
  vars?: Record<string, unknown>;

  /**
   * Describe when an analytics request should be sent.
   */
  triggers?: Record<string, AmpTrigger>;

  /**
   * Specify additional parameters to be included in the request.
   */
  extraUrlParams?: Record<string, string>;

  /**
   * Specify how to send a request. The value is an object with fields that
   * indicate which transport methods are acceptable.
   */
  transport?: {
    /** Indicate `navigator.sendBeacon` can be used to transmit the request. */
    beacon?: boolean;

    /** Indicate `XMLHttpRequest` can be used to transmit the request. */
    xhrpost?: boolean;

    /** Indicate the request can be sent by generating an `Image` tag. */
    image?: boolean;

    /** Indicate that an iframe can be used to transmit the request. */
    iframe?: boolean;
  };
}

/**
 * Specify the URLs used to transmit data to an analytics platform as well as
 * batching or reporting behavior of the request.
 */
export interface AmpRequest {
  /**
   * Define the url of the request.
   */
  baseUrl: string;

  /**
   * Specify the time (in seconds) to stop reporting requests.
   */
  reportWindow?: number;

  /**
   * Override the top-level `requestOrigin` property.
   */
  origin?: string;

  /**
   * Specify the time interval (in seconds) to flush request pings in the
   * batching queue.
   */
  batchInterval?: number;
}

/**
 * Object that describes when an analytics request should be sent.
 */
export interface AmpTrigger {
  /**
   * Event to listen.
   */
  on: string;

  /**
   * CSS/DOM query to select an element or a collection of elements to which the
   * trigger will be attached.
   */
  selector?: string;

  /**
   * Name of the request to be sent.
   */
  request?: string;

  [k: string]: unknown;
}
