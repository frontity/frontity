import get from "get-value";
import { useConnect, warn } from "../..";
import { Fill as StateFill, Package } from "../../../types";

/**
 * The fill items returned by the useFills hooks. They contain the same
 * information than {@link StateFill} plus the final React comonent and a key
 * to iterate over the array.
 */
interface Fill extends StateFill {
  /**
   * The React component that needs to be injected in the Slot for this fill.
   */
  Fill: React.ReactType;

  /**
   * A unique key that can be used when iterating over the array in React.
   */
  key: string;
}

/**
 * A React hook to ease the creation of `Slot` components.
 *
 * @param name The name of the Slot that you want to fill.
 *
 * @return Array of fill objects that you can use to inject in the slot for this name.
 */
const useFills = (name: string): Fill[] => {
  const { state, libraries } = useConnect<Package>();

  if (!name) {
    warn("You should pass the name of the slot that you would like to fill!");
    return [];
  }

  return (
    // Flat all the fills and turn them into entries.
    Object.values(state.fills || {})
      .reduce<[string, StateFill][]>(
        (fills, fill) => [...fills, ...Object.entries(fill)],
        []
      )
      // Match only the fills for this name.
      .filter(([, { slot }]) => slot === name)

      // 1. Nest the `key` of the fill
      // 2. Add default priority of 10 if not present
      // 3. Add the Fill component.
      .map(
        ([key, fill]): Fill => ({
          key,
          priority: fill.priority || 10,
          ...(fill.library && {
            Fill: get(libraries.fills, fill.library),
          }),
          ...fill,
        })
      )

      // Filter out fills without a Fill component.
      .filter(({ Fill, key, library }) => {
        if (!Fill)
          warn(
            `The Fill component for "${key}" cannot be found in "libraries.fills.${library}"`
          );
        return !!Fill;
      })

      // Sort by priority
      .sort((a, b) => a.priority - b.priority)
  );
};

export default useFills;
