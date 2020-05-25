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

  // The user has not specified any fills yet
  if (!state.fills || typeof state.fills !== "object") {
    return [];
  }

  return (
    Object.entries(state.fills)

      // Match only the fills for this name.
      .filter(([key, { slot }]) => slot === name)

      // 1. Nest the `key` of the fill
      // 2. Add default priority of 10 if not present
      .map(([key, value]) => ({
        key,
        priority: value.priority || 10,
        ...value,
      }))

      // Sort by priority
      .sort((a, b) => a.priority - b.priority)

      // Add real component to the array.
      .reduce((allFills: Fill[], fill) => {
        const { fills } = libraries;
        const { library } = fill;

        // If we cannot find the fill component in `libraries`
        // OR
        // if we cannot find the reference to the component in `state.fills.library` we skip.
        if (!fills || !library) return allFills;

        const newFill: Fill = {
          ...fill,
          Fill: libraries.fills[fill.library],
        };

        return allFills.concat(newFill);
      }, [])
  );
};

export default useFills;
