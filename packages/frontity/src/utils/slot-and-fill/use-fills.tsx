import React from "react";
import get from "get-value";
import { useConnect, warn, styled } from "../..";
import { Fill as StateFill, Package } from "../../../types";

/**
 * The fill items returned by the useFills hooks. They contain the same
 * information as {@link StateFill} plus the final React component and a key
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
 * Props for the {@link DebugFill} component.
 */
interface DebugFillProps {
  /**
   * The name of the slot.
   */
  name: string;
}

/**
 * The React component that is used in all the Slots when
 * `state.frontity.debug` is true.
 *
 * @param props - The props defined in {@link DebugFillProps}.
 *
 * @returns A blue div with the name of the slot.
 */
const DebugFill: React.FC<DebugFillProps> = ({ name }) => (
  <Debug data-slot-name={name}>Slot: &quot;{name}&quot;</Debug>
);

/**
 * Styles for the Debug Fill components.
 */
const Debug = styled.div`
  font-size: 20px;
  background: blue;
  color: yellow;
  padding: 10px;
`;

/**
 * A React hook to ease the creation of `Slot` components.
 *
 * @param name - The name of the Slot that you want to fill.
 *
 * @returns Array of fill objects that you can use to inject in the slot for this name.
 */
const useFills = (name: string): Fill[] => {
  const { state, libraries } = useConnect<Package>();

  if (!name) {
    warn("You should pass the name of the slot that you would like to fill!");
    return [];
  }

  if (state.frontity?.debug) {
    return [
      {
        key: "debug-fill",
        priority: 10,
        slot: name,
        library: "",
        Fill: DebugFill,
        props: {
          name,
        },
      },
    ];
  }

  return (
    // Flat all the fills and turn them into entries.
    Object.entries(state.fills || {})
      .reduce<Fill[]>(
        (allFills, [namespace, fills]) => [
          ...allFills,
          ...Object.entries(fills).map(
            // 1. Nest the `key` of the fill adding names.
            // 2. Add default priority of 10 if not present
            // 3. Add the Fill component.
            ([key, fill]): Fill => ({
              key: `${namespace} - ${key}`,
              priority: fill.priority || 10,
              ...(fill.library && {
                Fill: get(libraries.fills, fill.library),
              }),
              ...fill,
            })
          ),
        ],
        []
      )

      // Match only the fills for this name.
      .filter(({ slot }) => slot === name)

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
