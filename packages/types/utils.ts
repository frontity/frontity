import { Package } from "./";

// Include property keys from T where the property is assignable to U.
export type IncludeKeysOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T];
// Excludes property keys from T where the property is assignable to U.
export type ExcludeKeysOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? never : P
}[keyof T];

// Includes properties from T where the property is assignable to U.
// If F is defined, it substitutes the type.
export type IncludePropertyTypes<T, U, F = null> = {
  [K in IncludeKeysOfType<T, U>]: F extends null ? T[K] : F
};
// Excludes properties from T where the property is assignable to U.
// If F is defined, it substitutes the type.
export type ExcludePropertyTypes<T, U> = {
  [K in ExcludeKeysOfType<T, U>]: T[K]
};

// Makes properties of type T optional where the property is assignable to U.
// If F is defined, it substitutes the type.
export type OptionalPropertyType<T, U, F = null> = ExcludePropertyTypes<T, U> &
  Partial<IncludePropertyTypes<T, U, F>>;
// Makes properties of type T readonly where the property is assignable to U.
// If F is defined, it substitutes the type.
export type ReadonlyPropertyType<T, U, F = null> = ExcludePropertyTypes<T, U> &
  Readonly<IncludePropertyTypes<T, U, F>>;

// Makes properties partial and works deeply.
export type DeepPartial<T> = T extends Array<infer U>
  ? DeepPartialArray<U>
  : T extends object
  ? DeepPartialObject<T>
  : T;

// Makes properties partial and works deeply. This one excludes functions.
export type DeepPartialNoFunctions<T> = T extends Array<infer U>
  ? DeepPartialArrayNoMethods<U>
  : T extends object
  ? DeepPartialObjectNoMethods<T>
  : T;

export interface DeepPartialArrayNoMethods<T>
  extends Array<DeepPartialNoFunctions<T>> {}
export interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

export type DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type NonFunctionPropertyNames<T> = {
  [P in keyof T]: T[P] extends Function ? never : P
}[keyof T];

export type DeepPartialObjectNoMethods<T> = {
  [P in NonFunctionPropertyNames<T>]?: DeepPartialNoFunctions<T[P]>
};

// Creates an object with using the union type passed as props and assigning
// the type U.
export type EnumKeys<T extends string | number | symbol, U> = { [key in T]: U };

// Retrieves the type of the Array passed.
export type TypeOfArray<T> = T extends Array<infer U> ? U : T;

// type ResolveState<State extends Package["state"]> = State extends undefined
//   ? {}
//   : {
//       [P in keyof State]: State[P] extends (state: Package["state"]) => any
//         ? ReturnType<State[P]>
//         : State[P] extends Array<any>
//         ? State[P]
//         : State[P] extends Package["state"]
//         ? ResolveState<State[P]>
//         : State[P]
//     };
