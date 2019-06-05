declare module "himalaya" {
  type Node = import("./types").Node;

  export function parse(
    str: string,
    options?: { [key: string]: string }
  ): Node[];
}
