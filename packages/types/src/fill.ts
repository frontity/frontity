/**
 * The configuration object for a Fill.
 */
interface Fill {
  /**
   * The name of the Slot that this Fill wants to be injected in.
   */
  slot: string;

  /**
   * The name of the React component that it should be stored in
   * `libraries.fills`.
   */
  library: string;

  /**
   * The priority of this fill in relation to other fills that also point to
   * the same `slot`.
   *
   * @defaultValue 10
   */
  priority?: number;

  /**
   * Optional object with props that will be passed to the React component
   * defined in `library`.
   */
  props?: {
    [key: string]: any;
  };
}

export default Fill;
