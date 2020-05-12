import { useConnect, warn } from "frontity";

interface Fills {
  [key: string]: {
    slot: string;
    library: string;
    priority?: number;
    props?: {
      [key: string]: any;
    };
  };
}

interface FillsPackage {
  state: {
    fills: Fills;
  };
  libraries: {
    fills: {
      [key: string]: React.ComponentType;
    };
  };
}

const useFills = (name: string) => {
  const { state, libraries } = useConnect<FillsPackage>();

  if (!name) {
    warn("You should pass the name of the slot that you would like to fill!");
    return [];
  }

  if (!Object.values(state.fills).find((slot) => slot.slot === name)) {
    warn(`Could not find any slot with name ${name}. Is this what you want?`);
    return [];
  }

  return (
    Object.entries(state.fills)

      // Nest the `key` of the fill
      .map(([key, value]) => ({ key, ...value }))

      // Match only the fills for this name.
      .filter(({ slot }) => slot === name)

      // Sort by priority
      .sort((a, b) => a.priority - b.priority)

      // Add real component to the array.
      .map((fill) => {
        const { fills } = libraries;
        const { library } = fill;

        // If we cannot find the fill component in `libraries` OR
        // if we cannot find the reference to the component in `state.fills.library` return a "placeholder". This is more clear than .reduce()
        if (!fills || !library) return "not found";

        const Fill = libraries.fills[fill?.library];

        return {
          ...fill,
          Fill,
        };
      })
      // Remove the "placeholders" from the array
      .filter((item) => item !== "not found")
  );
};

export default useFills;
