export function isPlainObject(obj: any): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

export function isArray(arg: any) {
  return Array.isArray(arg);
}

export function isFunction(arg: any) {
  return arg instanceof Function;
}
