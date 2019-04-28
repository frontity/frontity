interface Package {
  name: string;
  active?: boolean;
  namespaces?: string[];
  settings?: {
    [namespace: string]: object;
  };
}

export default Package;
