import Namespaces from "../namespaces";

// Default Namespace.
const excluded1: Namespaces = [];
const excluded2: Namespaces = ["ns1", "ns2"];

// Populated Namespace once.
const excluded3: Namespaces<"ns1"> = [];
const excluded4: Namespaces<"ns1"> = ["ns1"];
const excluded5: Namespaces<"ns1"> = ["ns1", "settings"];

// Populated Namespace three times.
const excluded6: Namespaces<"ns1" | "ns2" | "ns3"> = [];
const excluded7: Namespaces<"ns1" | "ns2" | "ns3"> = ["ns1"];
const excluded8: Namespaces<"ns1" | "ns2" | "ns3"> = ["ns1", "ns2"];
const excluded9: Namespaces<"ns1" | "ns2" | "ns3"> = ["ns1", "ns2", "ns3"];
const excluded10: Namespaces<"ns1" | "ns2" | "ns3"> = ["ns1", "settings"];

// Inheritance
interface Package1 {
  namespaces: Namespaces;
}
interface Package2 extends Package1 {
  namespaces: Namespaces<"ns1" | string>;
}
interface Package3 extends Package2 {
  namespaces: Namespaces<"ns1" | "ns2">;
}
const package1: Package3 = {
  namespaces: []
};
const package2: Package3 = {
  namespaces: ["ns1"]
};
const package3: Package3 = {
  namespaces: ["ns1", "ns2", "settings"]
};

test("Types are fine!", () => {});
