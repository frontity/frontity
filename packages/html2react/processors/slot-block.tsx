import { Slot, warn } from "frontity";
import { Processor, Element } from "../types";

/**
 * The element processed by the {@link slotBlock} processor.
 */
interface SlotBlockElement extends Element {
  /**
   * Props.
   */
  props: Element["props"] & {
    /**
     * The name of the Slot defined in Gutenberg.
     */
    "data-frontity-slot-name": string;

    /**
     * The name of the Slot for the React component.
     */
    name: string;
  };
}

const slotBlock: Processor<SlotBlockElement> = {
  name: "slot block",
  test: ({ node }) =>
    node.props?.className?.includes("wp-block-frontity-frontity-slot"),
  processor: ({ node }) => {
    // If name is not defined, do not render the Slot.
    if (!node.props["data-frontity-slot-name"]) {
      warn("We found a Slot block, but it doesn't have a name.");
      node.component = () => null;
      return node;
    }

    node.props.name = node.props["data-frontity-slot-name"];
    node.component = Slot;
    return node;
  },
};

export default slotBlock;
