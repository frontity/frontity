declare module "himalaya" {
  type HimalayaNode = import("./types").HimalayaNode;

  export function parse(
    str: string,
    options?: { [key: string]: string }
  ): HimalayaNode[];
}
