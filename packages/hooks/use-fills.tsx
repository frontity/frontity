import { useConnect } from "frontity";

interface Fills {
  state: {
    fills: {
      [key: string]: {
        slot: string;
        library: string;
        priority: number;
        props: {
          [key: string]: any;
        };
      };
    };
  };
  libraries: {
    [key: string]: any;
  };
}

const useFills = (name) => {
  const { state, libraries } = useConnect<Fills>();

  Object.values(state.fills)
    // Match only the fills for this name.
    .find((fill) => fill.name === name)
    // Sort fills by priority.
    .sort((a, b) => a.priority > b.priority)
    // Add real component to the array.
    .map((fill) => {
      const Fill = libraries.fills[fill.library];
      return {
        ...fill,
        Fill,
      };
    });
};

export default useFills;
