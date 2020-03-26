import collectionHandlers from "./collections";

// eslint-disable-next-line
const globalObj =
  typeof window === "object" ? window : Function("return this")();

// built-in object can not be wrapped by Proxies
// their methods expect the object instance as the 'this' instead of the Proxy wrapper
// complex objects are wrapped with a Proxy of instrumented methods
// which switch the proxy to the raw object and to add reactive wiring
const handlers = new Map([
  [Map, collectionHandlers],
  [Set, collectionHandlers],
  [WeakMap, collectionHandlers],
  [WeakSet, collectionHandlers],
  [Object, false],
  [Array, false],
  [Int8Array, false],
  [Uint8Array, false],
  [Uint8ClampedArray, false],
  [Int16Array, false],
  [Uint16Array, false],
  [Int32Array, false],
  [Uint32Array, false],
  [Float32Array, false],
  [Float64Array, false],
]);

export function shouldInstrument({ constructor }) {
  const isBuiltIn =
    typeof constructor === "function" &&
    constructor.name in globalObj &&
    globalObj[constructor.name] === constructor;
  return !isBuiltIn || handlers.has(constructor);
}

export function getHandlers(obj) {
  return handlers.get(obj.constructor);
}
