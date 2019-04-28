type Package = {
  name: string; // Default: undefined
  active?: boolean; // Default: true
  namespaces?: string[]; // Default: undefined
  settings?: {
    [namespace: string]: object;
  };
};

export default Package;
